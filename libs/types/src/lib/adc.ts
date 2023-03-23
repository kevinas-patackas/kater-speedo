export interface AdcConfig {
  valueRangeMap: AdcValueRangeMap;
  sleepTime?: number;
  activeSleepTime?: number;
  adcAddress?: string;
  channel?: number;
  deviation?: number;
  busnum?: number;
  gain?: number;
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

// export const abc: AdcConfig = {
//   sleepTime: 1,
//   activeSleepTime: 0.1,
//   deviation: 100,
//   valueRangeMap: {
//     limitToMinMax: true,
//     min: {
//       reading: 0,
//       value: 0,
//     },
//     max: {
//       reading: 1000,
//       value: 100,
//     },
//     ranges: [
//       {
//         reading: 200,
//         value: 50,
//       },
//       {
//         reading: 400,
//         value: 90,
//       },
//       {
//         reading: 300,
//         value: 70,
//       },
//     ],
//   },
// };
