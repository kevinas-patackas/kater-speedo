import { CircularGaugeClassDefinition } from './types';

export const speedSetup: CircularGaugeClassDefinition = {
  type: 'circular',
  sizes: {
    container: 35,
    gauge: 29,
    danger: 1.5,
    outline: 0.5,
    outlineSpacer: 1,
    tick: 4, // 4
    segmentDivider: 0.15,
    label: 2.25,
    value: 8,
  },
  segments: 100,
  values: {
    min: 0,
    max: 100,
    good: {
      min: 0,
      max: 35,
    },
    warning: {
      min: 60,
      max: 70,
    },
    error: {
      min: 80,
      max: 100,
    },
  },
};
