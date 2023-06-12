export interface AdcConfig {
  valueRangeMap: AdcValueRangeMap;
  sleepTime?: number;
  activeSleepTime?: number;
  adcAddress?: string;
  channel?: number;
  deviation?: number;
  busnum?: number;
  gain?: number;
  roundTo?: number;
}

export interface AdcValueRangeMap {
  limitToMinMax: boolean;
  min: AdcValueRange;
  max: AdcValueRange;
  ranges: AdcValueRange[];
}

export interface AdcValueRange {
  reading: number;
  value: number;
}
