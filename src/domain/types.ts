export const componentRoles = [
  'motor',
  'propeller',
  'esc',
  'battery',
  'servos',
  'receiver',
] as const;

export type ComponentRole = (typeof componentRoles)[number];
export type BuildStatus = 'incomplete' | 'incompatible' | 'needs-check' | 'compatible';
export type RuleStatus = 'compatible' | 'incompatible' | 'needs-check';

export const roleLabels: Record<ComponentRole, string> = {
  motor: 'Motor',
  propeller: 'Propeller',
  esc: 'ESC',
  battery: 'Battery',
  servos: 'Servos',
  receiver: 'Receiver',
};

export interface Airframe {
  id: string;
  name: string;
  massG?: number;
  maxMassG?: number;
  wingspanMm?: number;
  wingAreaDm2?: number;
  maxPropDiameterMm?: number;
  motorMountMm?: number;
  requiredServoCount?: number;
  requiredReceiverChannels?: number;
  imageUrl?: string;
  dataStatus: 'synthetic-demo';
}

export interface MotorReferencePoint {
  propellerId: string;
  nominalVoltageV: number;
  currentA: number;
  staticThrustGf: number;
}

export interface Component {
  id: string;
  role: ComponentRole;
  name: string;
  massG?: number;
  quantity?: number;
  maxInputVoltageV?: number;
  maxCurrentA?: number;
  continuousCurrentA?: number;
  mountMm?: number;
  diameterMm?: number;
  nominalVoltageV?: number;
  fullChargeVoltageV?: number;
  capacityAh?: number;
  continuousCRating?: number;
  receiverChannels?: number;
  rangeM?: number;
  description?: string;
  manufacturer?: string;
  modelNumber?: string;
  sourceUrl?: string;
  sourceLastVerified?: string;
  modulation?: string;
  band?: string;
  minInputVoltageV?: number;
  maxReceiverInputVoltageV?: number;
  telemetry?: string;
  stabilization?: string;
  antenna?: string;
  rangeType?: string;
  serialOutput?: string;
  failsafe?: string;
  referencePoints?: MotorReferencePoint[];
  imageUrl?: string;
  dataStatus: 'synthetic-demo' | 'manufacturer-source';
}

export type ComponentSelections = Partial<Record<ComponentRole, string>>;

export interface CompatibilityResult {
  id: string;
  label: string;
  status: RuleStatus;
  detail: string;
  affectedRole?: ComponentRole | 'airframe';
  comparison?: string;
}

export interface CompatibilityEvaluation {
  status: BuildStatus;
  results: CompatibilityResult[];
  missingRoles: ComponentRole[];
}

export interface SpecificationValue {
  id: string;
  label: string;
  value: string | null;
  kind: 'catalog' | 'calculated' | 'estimate';
  inputs: string[];
  unavailableReason?: string;
}
