import { CanOutput } from '@kater-speedo/types';

export const calculateTemperature = (data: CanOutput) =>
  0.75 * parseInt(data.bytes[1], 16) - 48.373;
