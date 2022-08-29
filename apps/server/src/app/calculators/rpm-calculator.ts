import { CanOutput } from '@kater-speedo/types';

export const calculateRPM = (data: CanOutput) =>
  parseInt(`${data.bytes[3]}${data.bytes[2]}`, 16) / 6.4;
