import { componentById } from '../data/catalog';
import type { Airframe, Component, ComponentRole, ComponentSelections, SpecificationValue } from './types';
import { componentRoles, roleLabels } from './types';

const display = (value: number, fractionDigits = 0) => value.toLocaleString(undefined, {
  minimumFractionDigits: fractionDigits,
  maximumFractionDigits: fractionDigits,
});

const sumMass = (airframe: Airframe | undefined, selected: Partial<Record<ComponentRole, Component | undefined>>): number | undefined => {
  if (airframe?.massG === undefined) return undefined;
  if (componentRoles.some((role) => !selected[role] || selected[role]?.massG === undefined)) return undefined;
  return airframe.massG + componentRoles.reduce((sum, role) => {
    const component = selected[role]!;
    return sum + component.massG! * (component.quantity ?? 1);
  }, 0);
};

export function calculateSpecifications(
  airframe: Airframe | undefined,
  selections: ComponentSelections,
): SpecificationValue[] {
  const selected = Object.fromEntries(
    componentRoles.map((role) => [role, componentById(selections[role])]),
  ) as Partial<Record<ComponentRole, Component | undefined>>;
  const missingRoles = componentRoles.filter((role) => !selected[role]).map((role) => roleLabels[role]);
  const battery = selected.battery;
  const motor = selected.motor;
  const propeller = selected.propeller;
  const reference = motor?.referencePoints?.find((point) =>
    point.propellerId === propeller?.id && point.nominalVoltageV === battery?.nominalVoltageV,
  );
  const massG = sumMass(airframe, selected);
  const massUnavailable = missingRoles.length
    ? `Select ${missingRoles.join(', ')} to calculate total Build mass.`
    : !airframe ? 'Select an Airframe to calculate total Build mass.' : 'A required mass value is missing from the selected data.';

  const values: SpecificationValue[] = [
    {
      id: 'mass', label: 'Estimated Build mass',
      value: massG === undefined ? null : `${display(massG)} g`, kind: 'calculated',
      inputs: massG === undefined ? [] : [`Airframe ${airframe!.massG} g`, ...componentRoles.map((role) => {
        const component = selected[role]!;
        const count = component.quantity ?? 1;
        return `${component.name}: ${component.massG} g × ${count}`;
      })],
      unavailableReason: massG === undefined ? massUnavailable : undefined,
    },
    {
      id: 'wingspan', label: 'Wingspan',
      value: airframe?.wingspanMm === undefined ? null : `${display(airframe.wingspanMm)} mm`, kind: 'catalog',
      inputs: airframe?.wingspanMm === undefined ? [] : [`${airframe.name} published wingspan`],
      unavailableReason: airframe ? 'Wingspan is unavailable in the selected Airframe data.' : 'Select an Airframe to view its wingspan.',
    },
    {
      id: 'wing-loading', label: 'Wing loading',
      value: massG !== undefined && airframe?.wingAreaDm2 ? `${display(massG / airframe.wingAreaDm2, 1)} g/dm²` : null,
      kind: 'calculated',
      inputs: massG !== undefined && airframe?.wingAreaDm2 ? [`${display(massG)} g estimated mass`, `${display(airframe.wingAreaDm2, 1)} dm² wing area`] : [],
      unavailableReason: massG === undefined ? massUnavailable : 'Wing area is unavailable in the selected Airframe data.',
    },
    {
      id: 'battery-nominal', label: 'Battery nominal voltage',
      value: battery?.nominalVoltageV === undefined ? null : `${display(battery.nominalVoltageV, 1)} V`, kind: 'catalog',
      inputs: battery?.nominalVoltageV === undefined ? [] : [`${battery.name} catalog value`],
      unavailableReason: battery ? 'Nominal voltage is unavailable in the selected battery data.' : 'Select a battery to view nominal voltage.',
    },
    {
      id: 'battery-full', label: 'Battery full-charge voltage',
      value: battery?.fullChargeVoltageV === undefined ? null : `${display(battery.fullChargeVoltageV, 1)} V`, kind: 'catalog',
      inputs: battery?.fullChargeVoltageV === undefined ? [] : [`${battery.name} catalog value`],
      unavailableReason: battery ? 'Full-charge voltage is unavailable in the selected battery data.' : 'Select a battery to view full-charge voltage.',
    },
    {
      id: 'battery-capacity', label: 'Battery capacity',
      value: battery?.capacityAh === undefined ? null : `${display(battery.capacityAh, 1)} Ah`, kind: 'catalog',
      inputs: battery?.capacityAh === undefined ? [] : [`${battery.name} catalog value`],
      unavailableReason: battery ? 'Capacity is unavailable in the selected battery data.' : 'Select a battery to view capacity.',
    },
    {
      id: 'battery-discharge', label: 'Battery continuous discharge',
      value: battery?.capacityAh !== undefined && battery.continuousCRating !== undefined
        ? `${display(battery.capacityAh * battery.continuousCRating, 1)} A` : null,
      kind: 'calculated',
      inputs: battery?.capacityAh !== undefined && battery.continuousCRating !== undefined
        ? [`${display(battery.capacityAh, 1)} Ah capacity`, `${battery.continuousCRating}C continuous rating`] : [],
      unavailableReason: !battery ? 'Select a battery to calculate continuous discharge capability.'
        : battery.capacityAh === undefined ? 'Battery capacity is unavailable.'
          : 'Battery continuous C rating is unavailable.',
    },
    {
      id: 'input-power', label: 'Electrical input power',
      value: reference && battery?.nominalVoltageV !== undefined ? `${display(battery.nominalVoltageV * reference.currentA)} W` : null,
      kind: 'estimate',
      inputs: reference && battery?.nominalVoltageV !== undefined
        ? [`${display(battery.nominalVoltageV, 1)} V nominal battery voltage`, `${display(reference.currentA)} A motor/propeller reference current`] : [],
      unavailableReason: !battery || !motor || !propeller ? 'Select a battery, motor, and propeller.'
        : 'No matching motor/propeller current reference is available for this battery voltage.',
    },
    {
      id: 'thrust-weight', label: 'Static thrust-to-weight',
      value: reference && massG !== undefined ? `${display(reference.staticThrustGf / massG, 2)}:1` : null,
      kind: 'estimate',
      inputs: reference && massG !== undefined
        ? [`${display(reference.staticThrustGf)} gf reference thrust`, `${display(massG)} g estimated Build mass`] : [],
      unavailableReason: !reference ? 'A matching motor/propeller thrust reference is unavailable.' : massUnavailable,
    },
    {
      id: 'max-takeoff-mass', label: 'Maximum takeoff mass',
      value: airframe?.maxMassG === undefined ? null : `${display(airframe.maxMassG)} g`,
      kind: 'catalog',
      inputs: airframe?.maxMassG === undefined ? [] : [`${airframe.name} synthetic maximum takeoff mass`],
      unavailableReason: airframe ? 'Maximum takeoff mass is unavailable in the selected Airframe data.' : 'Select an Airframe to view its maximum takeoff mass.',
    },
    {
      id: 'range', label: 'Estimated range', value: null, kind: 'estimate', inputs: [],
      unavailableReason: 'Unavailable: no validated battery usable-energy, cruise-current, propulsion-efficiency, or reserve data.',
    },
    {
      id: 'max-speed', label: 'Maximum speed', value: null, kind: 'estimate', inputs: [],
      unavailableReason: 'Unavailable: no validated airframe drag, propeller performance, or full-throttle thrust data.',
    },
    {
      id: 'liftoff-speed', label: 'Estimated liftoff speed', value: null, kind: 'estimate', inputs: [],
      unavailableReason: 'Unavailable: wing area and mass alone are not enough; airfoil lift data, loading, and test conditions are missing.',
    },
  ];

  return values;
}
