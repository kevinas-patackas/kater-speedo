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

export enum SocketTopic {
  Temperature = 'temperature',
  RPM = 'rpm',
  Speed = 'speed',
  Fuel = 'fuel',
  Trim = 'trim',
}
