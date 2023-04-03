export interface CanOutput {
  canPort: string;
  id: string;
  byteCount: string;
  bytes: string[];
}

export enum CanDataId {
  Temperature = '329',
  RPM = '316',
}

export interface GpsdOutput {
  topic: string;
  value: string;
}

export enum GpsdDataId {
  Speed = 'speed',
  Heading = 'heading',
}

export enum SocketTopic {
  Temperature = 'temperature',
  RPM = 'rpm',
  Speed = 'speed',
  Fuel = 'fuel',
  Trim = 'trim',
  Voltage = 'voltage',
  OilPressure = 'oil-pressure',
}

export enum TechnicalSocketTopic {
  ConfigChanged = 'config-changed',
}
