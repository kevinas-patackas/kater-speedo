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
