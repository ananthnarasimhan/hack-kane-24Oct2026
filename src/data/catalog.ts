import type { Airframe, Component } from '../domain/types';
import trainerPlaneImage from '../assets/trainer-demo-plane.jpg';
import motorImage from '../assets/demo-motor.jpg';
import propellerImage from '../assets/demo-propeller.jpg';
import escImage from '../assets/demo-esc.jpg';
import batteryImage from '../assets/demo-battery.jpg';
import servosImage from '../assets/demo-servos.jpg';
import receiverImage from '../assets/demo-receiver.jpg';

export const trainerAirframe: Airframe = {
  id: 'trainer-airframe',
  name: 'Trainer demo Airframe',
  massG: 750,
  maxMassG: 1200,
  wingspanMm: 1200,
  wingAreaDm2: 24,
  maxPropDiameterMm: 254,
  motorMountMm: 16,
  requiredServoCount: 4,
  requiredReceiverChannels: 4,
  imageUrl: trainerPlaneImage,
  dataStatus: 'synthetic-demo',
};

export const airframes: Airframe[] = [trainerAirframe];

export const components: Component[] = [
  {
    id: 'drive-motor',
    role: 'motor',
    name: 'Drive demo motor',
    massG: 55,
    maxInputVoltageV: 12.6,
    maxCurrentA: 25,
    mountMm: 16,
    referencePoints: [
      { propellerId: 'drive-propeller', nominalVoltageV: 11.1, currentA: 20, staticThrustGf: 850 },
    ],
    imageUrl: motorImage,
    dataStatus: 'synthetic-demo',
  },
  {
    id: 'mismatch-mount-motor', role: 'motor', name: 'Motor demo · alternate mount',
    massG: 55, maxInputVoltageV: 12.6, maxCurrentA: 25, mountMm: 19,
    referencePoints: [{ propellerId: 'drive-propeller', nominalVoltageV: 11.1, currentA: 20, staticThrustGf: 850 }],
    imageUrl: motorImage, dataStatus: 'synthetic-demo',
  },
  {
    id: 'high-current-motor', role: 'motor', name: 'Motor demo · high draw',
    massG: 55, maxInputVoltageV: 12.6, maxCurrentA: 18, mountMm: 16,
    referencePoints: [{ propellerId: 'drive-propeller', nominalVoltageV: 11.1, currentA: 24, staticThrustGf: 900 }],
    imageUrl: motorImage, dataStatus: 'synthetic-demo',
  },
  {
    id: 'low-thrust-motor', role: 'motor', name: 'Motor demo · low thrust',
    massG: 55, maxInputVoltageV: 12.6, maxCurrentA: 15, mountMm: 16,
    referencePoints: [{ propellerId: 'drive-propeller', nominalVoltageV: 11.1, currentA: 10, staticThrustGf: 450 }],
    imageUrl: motorImage, dataStatus: 'synthetic-demo',
  },
  {
    id: 'high-thrust-motor', role: 'motor', name: 'Motor demo · high thrust',
    massG: 65, maxInputVoltageV: 12.6, maxCurrentA: 32, mountMm: 16,
    referencePoints: [{ propellerId: 'drive-propeller', nominalVoltageV: 11.1, currentA: 28, staticThrustGf: 1300 }],
    imageUrl: motorImage, dataStatus: 'synthetic-demo',
  },
  {
    id: 'drive-propeller',
    role: 'propeller',
    name: 'Drive demo propeller',
    massG: 10,
    diameterMm: 254,
    imageUrl: propellerImage,
    dataStatus: 'synthetic-demo',
  },
  {
    id: 'oversize-propeller',
    role: 'propeller',
    name: 'Oversize demo propeller',
    massG: 12,
    diameterMm: 279,
    imageUrl: propellerImage,
    dataStatus: 'synthetic-demo',
  },
  {
    id: 'power-esc',
    role: 'esc',
    name: 'Power demo ESC',
    massG: 25,
    maxInputVoltageV: 12.6,
    continuousCurrentA: 30,
    imageUrl: escImage,
    dataStatus: 'synthetic-demo',
  },
  { id: 'low-current-esc', role: 'esc', name: 'ESC demo · low current rating', massG: 25, maxInputVoltageV: 12.6, continuousCurrentA: 15, imageUrl: escImage, dataStatus: 'synthetic-demo' },
  { id: 'low-voltage-esc', role: 'esc', name: 'ESC demo · low voltage rating', massG: 25, maxInputVoltageV: 11.1, continuousCurrentA: 30, imageUrl: escImage, dataStatus: 'synthetic-demo' },
  {
    id: 'power-battery',
    role: 'battery',
    name: 'Power demo battery',
    massG: 180,
    nominalVoltageV: 11.1,
    fullChargeVoltageV: 12.6,
    capacityAh: 2.2,
    continuousCRating: 25,
    imageUrl: batteryImage,
    dataStatus: 'synthetic-demo',
  },
  {
    id: 'unknown-rating-battery',
    role: 'battery',
    name: 'Battery demo · rating unavailable',
    massG: 180,
    nominalVoltageV: 11.1,
    fullChargeVoltageV: 12.6,
    capacityAh: 2.2,
    imageUrl: batteryImage,
    dataStatus: 'synthetic-demo',
  },
  { id: 'high-voltage-battery', role: 'battery', name: 'Battery demo · high voltage', massG: 210, nominalVoltageV: 14.8, fullChargeVoltageV: 16.8, capacityAh: 2.2, continuousCRating: 25, imageUrl: batteryImage, dataStatus: 'synthetic-demo' },
  { id: 'no-reference-battery', role: 'battery', name: 'Battery demo · no matching motor reference', massG: 180, nominalVoltageV: 7.4, fullChargeVoltageV: 8.4, capacityAh: 2.2, continuousCRating: 25, imageUrl: batteryImage, dataStatus: 'synthetic-demo' },
  { id: 'low-discharge-battery', role: 'battery', name: 'Battery demo · low discharge', massG: 180, nominalVoltageV: 11.1, fullChargeVoltageV: 12.6, capacityAh: 1.0, continuousCRating: 10, imageUrl: batteryImage, dataStatus: 'synthetic-demo' },
  { id: 'mass-limit-battery', role: 'battery', name: 'Battery demo · high mass', massG: 350, nominalVoltageV: 11.1, fullChargeVoltageV: 12.6, capacityAh: 2.2, continuousCRating: 25, imageUrl: batteryImage, dataStatus: 'synthetic-demo' },
  {
    id: 'four-servo-set',
    role: 'servos',
    name: 'Control demo servos · set of 4',
    massG: 9,
    quantity: 4,
    imageUrl: servosImage,
    dataStatus: 'synthetic-demo',
  },
  { id: 'two-servo-set', role: 'servos', name: 'Control demo servos · set of 2', massG: 9, quantity: 2, imageUrl: servosImage, dataStatus: 'synthetic-demo' },
  {
    id: 'four-channel-receiver',
    role: 'receiver',
    name: 'Spektrum AR410 DSMX 4-Channel Sport Receiver',
    massG: 7,
    receiverChannels: 4,
    description: 'Full-range sport air receiver with an internal antenna, integrated fly-by telemetry, and a bind button.',
    manufacturer: 'Spektrum',
    modelNumber: 'SPMAR410',
    sourceUrl: 'https://www.spektrumrc.com/product/spektrum-ar410-dsmx-4-channel-sport-receiver/SPMAR410.html',
    sourceLastVerified: '2026-10-24',
    modulation: 'DSMX',
    band: '2.4 GHz',
    minInputVoltageV: 3.5,
    maxReceiverInputVoltageV: 9,
    telemetry: 'Integrated, fly-by range',
    antenna: 'Internal',
    rangeType: 'Full',
    serialOutput: 'None',
    failsafe: 'Yes',
    dataStatus: 'manufacturer-source',
  },
  {
    id: 'spektrum-ar620',
    role: 'receiver',
    name: 'Spektrum AR620 DSMX 6-Channel Sport Receiver',
    massG: 8,
    receiverChannels: 6,
    description: 'Full-range sport air receiver with an internal antenna and integrated receiver-voltage and flight-log telemetry.',
    manufacturer: 'Spektrum',
    modelNumber: 'SPMAR620',
    sourceUrl: 'https://www.spektrumrc.com/product/spektrum-ar620-dsmx-6-channel-sport-receiver/SPMAR620.html',
    sourceLastVerified: '2026-10-24',
    modulation: 'DSMX (also DSM2 compatible)',
    band: '2.4 GHz',
    minInputVoltageV: 3.5,
    maxReceiverInputVoltageV: 9,
    telemetry: 'Integrated, fly-by range',
    antenna: 'Internal',
    rangeType: 'Full',
    serialOutput: 'None',
    failsafe: 'Yes',
    dataStatus: 'manufacturer-source',
  },
  {
    id: 'spektrum-ar631',
    role: 'receiver',
    name: 'Spektrum AR631 DSMX 6-Channel AS3X & SAFE Receiver',
    massG: 8,
    receiverChannels: 6,
    description: 'Full-range airplane and sailplane receiver with AS3X and SAFE stabilization, Smart telemetry support, and SRXL2 serial output.',
    manufacturer: 'Spektrum',
    modelNumber: 'SPMAR631',
    sourceUrl: 'https://www.spektrumrc.com/product/spektrum-ar631-dsmx-6-channel-as3x-and-safe-receiver/SPMAR631.html',
    sourceLastVerified: '2026-10-24',
    modulation: 'DSMX',
    band: '2.4 GHz',
    minInputVoltageV: 3.5,
    maxReceiverInputVoltageV: 9,
    telemetry: 'Smart, fly-by range',
    stabilization: 'AS3X / SAFE',
    antenna: '229 mm',
    rangeType: 'Full',
    serialOutput: 'SRXL2',
    dataStatus: 'manufacturer-source',
  },
  { id: 'three-channel-receiver', role: 'receiver', name: 'Control demo receiver · 3 channels', massG: 12, receiverChannels: 3, rangeM: 90, imageUrl: receiverImage, dataStatus: 'synthetic-demo' },
  { id: 'weak-range-receiver', role: 'receiver', name: 'Control demo receiver · short range', massG: 12, receiverChannels: 4, rangeM: 40, imageUrl: receiverImage, dataStatus: 'synthetic-demo' },
];

const baseBuild = {
  motor: 'drive-motor', propeller: 'drive-propeller', esc: 'power-esc', battery: 'power-battery',
  servos: 'four-servo-set', receiver: 'four-channel-receiver',
} as const;

export const demoScenarios = {
  compatible: baseBuild,
  mismatch: {
    ...baseBuild,
    propeller: 'oversize-propeller',
  },
  missingData: {
    ...baseBuild,
    battery: 'unknown-rating-battery',
  },
  voltageMismatch: { ...baseBuild, battery: 'high-voltage-battery' },
  motorCurrent: { ...baseBuild, motor: 'high-current-motor' },
  escCurrent: { ...baseBuild, esc: 'low-current-esc' },
  batteryDischarge: { ...baseBuild, battery: 'low-discharge-battery' },
  mountMismatch: { ...baseBuild, motor: 'mismatch-mount-motor' },
  massExceeded: { ...baseBuild, battery: 'mass-limit-battery' },
  servoCount: { ...baseBuild, servos: 'two-servo-set' },
  receiverChannels: { ...baseBuild, receiver: 'three-channel-receiver' },
} as const;

export const demoScenarioInfo: Record<DemoScenario, { label: string; expected: string }> = {
  compatible: { label: 'Passing setup', expected: 'All supported checks pass' },
  mismatch: { label: 'Propeller clearance', expected: 'Propeller clearance fails' },
  missingData: { label: 'Missing battery rating', expected: 'Battery discharge needs check' },
  voltageMismatch: { label: 'Voltage limit', expected: 'Motor and ESC voltage fail' },
  motorCurrent: { label: 'Motor current', expected: 'Motor current exceeds limit' },
  escCurrent: { label: 'ESC current', expected: 'ESC current exceeds rating' },
  batteryDischarge: { label: 'Battery discharge', expected: 'Battery discharge capability fails' },
  mountMismatch: { label: 'Motor mount', expected: 'Motor mount pattern fails' },
  massExceeded: { label: 'Build mass', expected: 'Build mass exceeds airframe max' },
  servoCount: { label: 'Servo capacity', expected: 'Selected servo count is short' },
  receiverChannels: { label: 'Receiver channels', expected: 'Receiver channel count is short' },
};

export type DemoScenario = keyof typeof demoScenarios;

export const demoProfiles = {
  lowPower: { ...baseBuild, motor: 'low-thrust-motor' },
  balancedPower: baseBuild,
  highThrust: { ...baseBuild, motor: 'high-thrust-motor' },
  unavailableReference: { ...baseBuild, battery: 'no-reference-battery' },
  weakReceiverRange: { ...baseBuild, receiver: 'weak-range-receiver' },
} as const;

export const demoProfileInfo: Record<DemoProfile, { label: string; detail: string }> = {
  lowPower: { label: 'Low thrust', detail: 'Synthetic 450 gf reference · slower illustrative pace' },
  balancedPower: { label: 'Balanced trainer', detail: 'Synthetic 850 gf reference · baseline pace' },
  highThrust: { label: 'High thrust', detail: 'Synthetic 1,300 gf reference · faster illustrative pace' },
  unavailableReference: { label: 'No thrust estimate', detail: 'Synthetic battery has no matching motor reference · neutral pace' },
  weakReceiverRange: { label: 'Weak receiver range', detail: 'Synthetic 40 m range · signal-loss warning after range is exceeded' },
};

export type DemoProfile = keyof typeof demoProfiles;

export const componentById = (id: string | undefined): Component | undefined =>
  id ? components.find((component) => component.id === id) : undefined;

export const airframeById = (id: string | undefined): Airframe | undefined =>
  id ? airframes.find((airframe) => airframe.id === id) : undefined;
