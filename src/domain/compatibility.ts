import { componentById } from '../data/catalog';
import type {
  Airframe,
  BuildStatus,
  Component,
  ComponentRole,
  ComponentSelections,
  CompatibilityEvaluation,
  CompatibilityResult,
  RuleStatus,
} from './types';
import { componentRoles, roleLabels } from './types';

const result = (
  id: string,
  label: string,
  status: RuleStatus,
  detail: string,
  affectedRole?: ComponentRole | 'airframe',
  comparison?: string,
): CompatibilityResult => ({ id, label, status, detail, affectedRole, comparison });

const missingValue = (component: Component | undefined, field: keyof Component): boolean =>
  !component || component[field] === undefined;

export function evaluateCompatibility(
  airframe: Airframe | undefined,
  selections: ComponentSelections,
): CompatibilityEvaluation {
  const selected = Object.fromEntries(
    componentRoles.map((role) => [role, componentById(selections[role])]),
  ) as Record<ComponentRole, Component | undefined>;
  const missingRoles = componentRoles.filter((role) => !selected[role]);
  const results: CompatibilityResult[] = [];

  const battery = selected.battery;
  const motor = selected.motor;
  const esc = selected.esc;
  const propeller = selected.propeller;

  for (const [role, component, label] of [
    ['motor', motor, 'Motor voltage'],
    ['esc', esc, 'ESC voltage'],
  ] as const) {
    if (!battery || !component || !airframe) {
      results.push(result(`${role}-voltage`, label, 'needs-check', 'Select an Airframe, battery, and component to compare full-charge voltage.', role));
    } else if (missingValue(battery, 'fullChargeVoltageV') || missingValue(component, 'maxInputVoltageV')) {
      const absent = [
        missingValue(battery, 'fullChargeVoltageV') ? 'battery full-charge voltage' : '',
        missingValue(component, 'maxInputVoltageV') ? `${roleLabels[role]} maximum input voltage` : '',
      ].filter(Boolean).join(' and ');
      results.push(result(`${role}-voltage`, label, 'needs-check', `Unavailable input: ${absent}.`, role));
    } else {
      const fullCharge = battery.fullChargeVoltageV!;
      const limit = component.maxInputVoltageV!;
      const pass = fullCharge <= limit;
      results.push(result(
        `${role}-voltage`, label, pass ? 'compatible' : 'incompatible',
        pass ? `Battery full-charge voltage is within the ${roleLabels[role].toLowerCase()} limit.` : `Battery full-charge voltage exceeds the ${roleLabels[role].toLowerCase()} limit. Choose a compatible ${roleLabels[role].toLowerCase()} or battery.`,
        role, `${fullCharge.toFixed(1)} V full charge ${pass ? '≤' : '>'} ${limit.toFixed(1)} V maximum`,
      ));
    }
  }

  const reference = motor?.referencePoints?.find((point) =>
    point.propellerId === propeller?.id && point.nominalVoltageV === battery?.nominalVoltageV,
  );
  if (!motor || !propeller || !battery || !esc) {
    results.push(result('current-reference', 'Current and battery draw', 'needs-check', 'Select a motor, propeller, ESC, and battery to check the reference current.', 'battery'));
  } else if (!reference) {
    results.push(result('current-reference', 'Current and battery draw', 'needs-check', 'No motor reference point is available for this propeller at the selected battery nominal voltage.', 'propeller'));
  } else {
    const current = reference.currentA;
    const referenceText = `${current} A reference at ${reference.nominalVoltageV.toFixed(1)} V`;
    if (motor.maxCurrentA === undefined) {
      results.push(result('motor-current', 'Motor current', 'needs-check', 'Unavailable input: motor maximum current.', 'motor', referenceText));
    } else {
      const pass = current <= motor.maxCurrentA;
      results.push(result('motor-current', 'Motor current', pass ? 'compatible' : 'incompatible',
        pass ? 'Reference current is within the motor maximum.' : 'Reference current exceeds the motor maximum. Choose a motor or power setup with a supported current limit.',
        'motor', `${referenceText} · ${current} A ${pass ? '≤' : '>'} ${motor.maxCurrentA} A motor maximum`));
    }
    if (esc.continuousCurrentA === undefined) {
      results.push(result('esc-current', 'ESC current', 'needs-check', 'Unavailable input: ESC continuous current rating.', 'esc', referenceText));
    } else {
      const pass = current <= esc.continuousCurrentA;
      results.push(result('esc-current', 'ESC current', pass ? 'compatible' : 'incompatible',
        pass ? 'Reference current is within the ESC continuous-current rating.' : 'Reference current exceeds the ESC continuous-current rating. Choose a higher-rated ESC or compatible power setup.',
        'esc', `${referenceText} · ${current} A ${pass ? '≤' : '>'} ${esc.continuousCurrentA} A ESC continuous`));
    }
    if (battery.capacityAh === undefined || battery.continuousCRating === undefined) {
      const unavailable = [
        battery.capacityAh === undefined ? 'battery capacity' : '',
        battery.continuousCRating === undefined ? 'battery continuous C rating' : '',
      ].filter(Boolean).join(' and ');
      results.push(result('battery-current', 'Battery discharge', 'needs-check', `Unavailable input: ${unavailable}. Battery continuous discharge capability cannot be confirmed.`, 'battery', referenceText));
    } else {
      const limit = battery.capacityAh * battery.continuousCRating;
      const pass = current <= limit;
      results.push(result('battery-current', 'Battery discharge', pass ? 'compatible' : 'incompatible',
        pass ? 'Reference current is within the battery continuous discharge capability.' : 'Reference current exceeds the battery continuous discharge capability. Choose a higher-rated battery or compatible power setup.',
        'battery', `${referenceText} · ${current} A ${pass ? '≤' : '>'} ${limit.toFixed(1)} A battery continuous (${battery.capacityAh.toFixed(1)} Ah × ${battery.continuousCRating}C)`));
    }
  }

  const unmeasuredMass: string[] = [];
  if (!airframe) unmeasuredMass.push('Airframe');
  else if (airframe.massG === undefined) unmeasuredMass.push('Airframe mass');
  if (airframe?.maxMassG === undefined) unmeasuredMass.push('Airframe maximum mass');
  for (const role of componentRoles) {
    const component = selected[role];
    if (component && component.massG === undefined) unmeasuredMass.push(`${component.name} mass`);
  }
  if (missingRoles.length) unmeasuredMass.push(...missingRoles.map((role) => `${roleLabels[role]} selection`));
  if (unmeasuredMass.length) {
    results.push(result('mass', 'Airframe mass', 'needs-check', `Unavailable input: ${unmeasuredMass.join(', ')}.`, 'airframe'));
  } else {
    const totalMass = airframe!.massG! + componentRoles.reduce((sum, role) => {
      const part = selected[role]!;
      return sum + part.massG! * (part.quantity ?? 1);
    }, 0);
    const limit = airframe!.maxMassG!;
    const pass = totalMass <= limit;
    results.push(result('mass', 'Airframe mass', pass ? 'compatible' : 'incompatible',
      pass ? 'Estimated Build mass is within the Airframe maximum.' : 'Estimated Build mass exceeds the Airframe maximum. Review the selected Components.',
      'airframe', `${totalMass.toLocaleString()} g estimated ${pass ? '≤' : '>'} ${limit.toLocaleString()} g maximum`));
  }

  if (!airframe || !motor) {
    results.push(result('mount', 'Motor mount fit', 'needs-check', 'Select an Airframe and motor to compare the mount pattern.', 'motor'));
  } else if (airframe.motorMountMm === undefined || motor.mountMm === undefined) {
    results.push(result('mount', 'Motor mount fit', 'needs-check', `Unavailable input: ${airframe.motorMountMm === undefined ? 'Airframe motor-mount pattern' : 'motor mount pattern'}.`, 'motor'));
  } else {
    const pass = airframe.motorMountMm === motor.mountMm;
    results.push(result('mount', 'Motor mount fit', pass ? 'compatible' : 'incompatible',
      pass ? 'Motor mount pattern matches the Airframe.' : 'Motor mount pattern does not match the Airframe. Choose a matching motor.',
      'motor', `${motor.mountMm} mm motor mount ${pass ? '=' : '≠'} ${airframe.motorMountMm} mm Airframe pattern`));
  }

  if (!airframe || !propeller) {
    results.push(result('clearance', 'Propeller clearance', 'needs-check', 'Select an Airframe and propeller to compare diameter with clearance.', 'propeller'));
  } else if (airframe.maxPropDiameterMm === undefined || propeller.diameterMm === undefined) {
    results.push(result('clearance', 'Propeller clearance', 'needs-check', `Unavailable input: ${airframe.maxPropDiameterMm === undefined ? 'Airframe propeller clearance' : 'propeller diameter'}.`, 'propeller'));
  } else {
    const pass = propeller.diameterMm <= airframe.maxPropDiameterMm;
    results.push(result('clearance', 'Propeller clearance', pass ? 'compatible' : 'incompatible',
      pass ? 'Propeller diameter is within the Airframe clearance.' : 'Propeller exceeds the Airframe clearance. Choose a smaller propeller.',
      'propeller', `${propeller.diameterMm} mm propeller ${pass ? '≤' : '>'} ${airframe.maxPropDiameterMm} mm clearance`));
  }

  const servos = selected.servos;
  if (!airframe || !servos) {
    results.push(result('servos', 'Servo capacity', 'needs-check', 'Select an Airframe and servo set to compare required control count.', 'servos'));
  } else if (airframe.requiredServoCount === undefined || servos.quantity === undefined) {
    results.push(result('servos', 'Servo capacity', 'needs-check', `Unavailable input: ${airframe.requiredServoCount === undefined ? 'Airframe required servo count' : 'selected servo count'}.`, 'servos'));
  } else {
    const pass = servos.quantity >= airframe.requiredServoCount;
    results.push(result('servos', 'Servo capacity', pass ? 'compatible' : 'incompatible',
      pass ? 'Selected servo count meets the Airframe requirement.' : 'Selected servo count is below the Airframe requirement. Choose a larger servo set.',
      'servos', `${servos.quantity} servos selected ${pass ? '≥' : '<'} ${airframe.requiredServoCount} required`));
  }

  const receiver = selected.receiver;
  if (!airframe || !receiver) {
    results.push(result('receiver', 'Receiver channels', 'needs-check', 'Select an Airframe and receiver to compare channel capacity.', 'receiver'));
  } else if (airframe.requiredReceiverChannels === undefined || receiver.receiverChannels === undefined) {
    results.push(result('receiver', 'Receiver channels', 'needs-check', `Unavailable input: ${airframe.requiredReceiverChannels === undefined ? 'Airframe required receiver channels' : 'receiver channel count'}.`, 'receiver'));
  } else {
    const pass = receiver.receiverChannels >= airframe.requiredReceiverChannels;
    results.push(result('receiver', 'Receiver channels', pass ? 'compatible' : 'incompatible',
      pass ? 'Receiver channel count meets the Airframe requirement.' : 'Receiver has fewer channels than the Airframe requires. Choose a receiver with more channels.',
      'receiver', `${receiver.receiverChannels} channels available ${pass ? '≥' : '<'} ${airframe.requiredReceiverChannels} required`));
  }

  const status: BuildStatus = !airframe || missingRoles.length > 0
    ? 'incomplete'
    : results.some((item) => item.status === 'incompatible')
      ? 'incompatible'
      : results.some((item) => item.status === 'needs-check')
        ? 'needs-check'
        : 'compatible';

  return { status, results, missingRoles };
}
