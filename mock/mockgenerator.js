const tempMock = [
  0, 0, 0, -1, 1, 1, 1, -2, 2, 2, 2, -1, 3, 3, 3, 4, 4, 4, 4, 8, 5, 5, 5, 2, 6,
  6, 6, 3, 7, 7, 7, 9, 8, 8, 8, 7, 9, 9, 9, 6, 10, 10, 10, 12, 11, 11, 11, 15,
  12, 12, 12, 14, 13, 13, 13, 11, 14, 14, 14, 13, 15, 15, 15, 10, 16, 16, 16,
  14, 17, 17, 17, 14, 18, 18, 18, 15, 19, 19, 19, 15, 20, 20, 20, 22, 21, 21,
  21, 17, 22, 22, 22, 19, 23, 23, 23, 23, 24, 24, 24, 20, 25, 25, 25, 22, 26,
  26, 26, 24, 27, 27, 27, 23, 28, 28, 28, 28, 29, 29, 29, 30, 30, 30, 30, 26,
  31, 31, 31, 33, 32, 32, 32, 30, 33, 33, 33, 36, 34, 34, 34, 33, 35, 35, 35,
  30, 36, 36, 36, 40, 37, 37, 37, 38, 38, 38, 38, 35, 39, 39, 39, 34, 40, 40,
  40, 39, 41, 41, 41, 36, 42, 42, 42, 42, 43, 43, 43, 44, 44, 44, 44, 40, 45,
  45, 45, 49, 46, 46, 46, 43, 47, 47, 47, 43, 48, 48, 48, 44, 49, 49, 49, 47,
  50, 50, 50, 53, 51, 51, 51, 47, 52, 52, 52, 55, 53, 53, 53, 53, 54, 54, 54,
  56, 55, 55, 55, 59, 56, 56, 56, 56, 57, 57, 57, 61, 58, 58, 58, 58, 59, 59,
  59, 60, 60, 60, 60, 56, 61, 61, 61, 64, 62, 62, 62, 66, 63, 63, 63, 67, 64,
  64, 64, 67, 65, 65, 65, 61, 66, 66, 66, 63, 67, 67, 67, 66, 68, 68, 68, 72,
  69, 69, 69, 64, 70, 70, 70, 70, 71, 71, 71, 72, 72, 72, 72, 73, 73, 73, 73,
  71, 74, 74, 74, 72, 75, 75, 75, 79, 76, 76, 76, 80, 77, 77, 77, 79, 78, 78,
  78, 79, 79, 79, 79, 76, 80, 80, 80, 82, 81, 81, 81, 81, 82, 82, 82, 77, 83,
  83, 83, 84, 84, 84, 84, 88, 85, 85, 85, 83, 86, 86, 86, 83, 87, 87, 87, 90,
  88, 88, 88, 83, 89, 89, 89, 87, 90, 90, 90, 87, 90, 90, 90, 94, 90, 90, 90,
  86, 90, 90, 90, 94, 90, 90, 90, 86, 90, 90, 90, 88, 90, 90, 90, 93, 90, 90,
  90, 89, 90, 90, 90, 91, 90, 90, 90, 89, 90, 90, 90, 93, 90, 90, 90, 89, 90,
  90, 90, 91, 90, 90, 90, 89, 90, 90, 90, 89, 90, 90, 90, 86, 90, 90, 90, 93,
  90, 90, 90, 89, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,
  86, 90, 90, 90, 92, 90, 90, 90, 87, 90, 90, 90, 86, 90, 90, 90, 90, 90, 90,
  90, 88, 90, 90, 90, 89, 90, 90, 90, 89, 90, 90, 90, 94, 90, 90, 90, 93, 90,
  90, 90, 88, 90, 90, 90, 87, 90, 90, 90, 94, 90, 90, 90, 92, 90, 90, 90, 87,
  90, 90, 90, 91, 90, 90, 90, 92, 90, 90, 90, 87, 90, 90, 90, 89, 90, 90, 90,
  91, 90, 90, 90, 91, 90, 90, 90, 90, 90, 90, 90, 94, 90, 90, 90, 86, 90, 90,
  90, 88, 90, 90, 90, 93, 90, 90, 90, 94, 90, 90, 90, 92, 90, 90, 90, 88, 90,
  90, 90, 86, 90, 90, 90, 89, 90, 90, 90, 93, 90, 90, 90, 89, 90, 90, 90, 93,
  90, 90, 90, 92, 90, 90, 90, 94, 90, 90, 90, 94, 90, 90, 90, 90, 90, 90, 90,
  87, 90, 90, 90, 86, 90, 90, 90, 90, 90, 90, 90, 86, 90, 90, 90, 87, 90, 90,
  90, 92, 90, 90, 90, 88, 90, 90, 90, 88, 90, 90, 90, 85, 90, 90, 90, 91, 90,
  90, 90, 92, 90, 90, 90, 85, 90, 90, 90, 93, 90, 90, 90, 86, 90, 90, 90, 92,
  90, 90, 90, 91, 90, 90, 90, 91, 90, 90, 90, 94, 90, 90, 90, 91, 90, 90, 90,
  92, 90, 90, 90, 94, 90, 90, 90, 89, 90, 90, 90, 88, 90, 90, 90, 93, 90, 90,
  90, 93, 90, 90, 90, 86, 90, 90, 90, 93, 90, 90, 90, 89, 90, 90, 90, 85, 90,
  90, 90, 90, 90, 90, 90, 87, 90, 90, 90, 91, 90, 90, 90, 91, 90, 90, 90, 87,
  90, 90, 90, 85, 90, 90, 90, 91, 90, 90, 90, 87, 90, 90, 90, 93, 90, 90, 90,
  90, 90, 90, 90, 90, 90, 90, 90, 87, 90, 90, 90, 85, 90, 90, 90, 90, 90, 90,
  90, 92, 90, 90, 90, 90, 90, 90, 90, 87, 90, 90, 90, 89, 90, 90, 90, 86, 90,
  90, 90, 87, 90, 90, 90, 91, 90, 90, 90, 86, 90, 90, 90, 93, 90, 90, 90, 87,
  90, 90, 90, 91, 90, 90, 90, 86, 90, 90, 90, 91, 90, 90, 90, 90, 90, 90, 90,
  93, 90, 90, 90, 92, 90, 90, 90, 92, 90, 90, 90, 91, 90, 90, 90, 92, 90, 90,
  90, 90, 90, 90, 90, 93, 90, 90, 90, 92, 90, 90, 90, 87, 90, 90, 90, 85, 90,
  90, 90, 94, 90, 90, 90, 91, 90, 90, 90, 89, 90, 90, 90, 85, 90, 90, 90, 86,
  90, 90, 90, 94, 90, 90, 90, 88, 90, 90, 90, 91, 90, 90, 90, 91, 90, 90, 90,
  87, 90, 90, 90, 90, 90, 90, 90, 93, 90, 90, 90, 88, 90, 90, 90, 88, 90, 90,
  90, 90, 90, 90, 90, 87, 90, 90, 90, 87, 90, 90, 90, 92, 90, 90, 90, 94, 90,
  90, 90, 87, 90, 90, 90, 86, 90, 90, 90, 94, 90, 90, 90, 91, 90, 90, 90, 86,
  90, 90, 90, 86, 90, 90, 90, 88, 90, 90, 90, 89, 90, 90, 90, 94, 90, 90, 90,
  88, 90, 90, 90, 91, 90, 90, 90, 88, 90, 90, 90, 88, 90, 90, 90, 92, 90, 90,
  90, 92, 90, 90, 90, 86, 90, 90, 90, 93, 90, 90, 90, 89, 90, 90, 90, 92, 90,
  90, 90, 91, 90, 90, 90, 87, 90, 90, 90, 89, 90, 90, 90, 91, 90, 90, 90, 90,
  90, 90, 90, 89, 90, 90, 90, 93, 90, 90, 90, 89, 90, 90, 90, 92, 90, 90, 90,
  93, 90, 90, 90, 87, 90, 90, 90, 86, 90, 90, 90, 87, 90, 90, 90, 94, 90, 90,
  90, 85, 90, 90, 90, 89, 90, 90, 90, 93, 91, 91, 91, 93, 92, 92, 92, 87, 93,
  93, 93, 96, 94, 94, 94, 98, 95, 95, 95, 97, 96, 96, 96, 99, 97, 97, 97, 96,
  98, 98, 98, 98, 99, 99, 99, 100, 100, 100, 100, 99, 101, 101, 101, 98, 102,
  102, 102, 102, 103, 103, 103, 100, 104, 104, 104, 104, 105, 105, 105, 109,
  106, 106, 106, 101, 107, 107, 107, 108, 108, 108, 108, 107, 109, 109, 109,
  111, 110, 110, 110, 109, 111, 111, 111, 110, 112, 112, 112, 110, 113, 113,
  113, 115, 114, 114, 114, 110, 115, 115, 115, 115, 116, 116, 116, 119, 117,
  117, 117, 115, 118, 118, 118, 118, 119, 119, 119, 122, 120, 120, 120, 123,
  121, 121, 121, 118, 122, 122, 122, 125, 123, 123, 123, 120, 124, 124, 124,
  123,
];

const rpmMock = [
  0, 17, 43, 65, 98, 170, 252, 334, 407, 470, 496, 576, 618, 634, 656, 722, 743,
  820, 851, 908, 981, 1035, 1104, 1150, 1183, 1211, 1296, 1348, 1429, 1511,
  1576, 1650, 1715, 1762, 1819, 1894, 1965, 2019, 2073, 2112, 2147, 2179, 2224,
  2304, 2346, 2431, 2484, 2562, 2633, 2718, 2802, 2887, 2936, 2989, 3051, 3138,
  3177, 3262, 3345, 3362, 3448, 3530, 3616, 3658, 3693, 3744, 3797, 3818, 3856,
  3876, 3901, 3921, 3973, 3996, 4075, 4157, 4241, 4305, 4387, 4437, 4451, 4466,
  4492, 4510, 4531, 4546, 4581, 4648, 4703, 4759, 4838, 4883, 4898, 4963, 5016,
  5064, 5136, 5154, 5178, 5178, 5154, 5136, 5064, 5016, 4963, 4898, 4883, 4838,
  4759, 4703, 4648, 4581, 4546, 4531, 4510, 4492, 4466, 4451, 4437, 4387, 4305,
  4241, 4157, 4075, 3996, 3973, 3921, 3901, 3876, 3856, 3818, 3797, 3744, 3693,
  3658, 3616, 3530, 3448, 3362, 3345, 3262, 3177, 3138, 3051, 2989, 2936, 2887,
  2802, 2718, 2633, 2562, 2484, 2431, 2346, 2304, 2224, 2179, 2147, 2112, 2073,
  2019, 1965, 1894, 1819, 1762, 1715, 1650, 1576, 1511, 1429, 1348, 1296, 1211,
  1183, 1150, 1104, 1035, 981, 908, 851, 820, 743, 722, 656, 634, 618, 576, 496,
  470, 407, 334, 252, 170, 98, 65, 43, 17, 0,
];

var fs = require('fs');
var writer = fs.createWriteStream('VACIATASFAILAS.txt', {
  flags: 'a', // 'a' means appending (old data will be preserved)
});

const generateTempLine = (desiredTemp, index) =>
  `array[${index}]="can0  329   [8]  E0 ${Number(
    (Number(desiredTemp + 48.373) / 0.75).toFixed(0)
  ).toString(16)} C6 E9 0 0 0 0"\n`;

const generateRPMLine = (desiredRPM, index) => {
  const hexValue = Number(Number(desiredRPM * 6.4).toFixed(0));
  const bytes = Number(hexValue).toString(16).padStart(4, '0').toUpperCase();

  const byte3 = bytes.substring(0, 2);
  const byte2 = bytes.substring(2, 4);

  return `array[${index}]="can0  316   [8]  E0 61 ${byte2} ${byte3} 0 0 E0 0"\n`;
};

let overallIndex = 0;
let rpmIndex = 0;

for (const temp of tempMock) {
  writer.write(generateTempLine(temp, overallIndex));
  overallIndex++;

  writer.write(generateRPMLine(rpmMock[rpmIndex], overallIndex));
  overallIndex++;
  rpmIndex++;

  if (rpmIndex >= rpmMock.length) {
    rpmIndex = 0;
  }

  writer.write(`array[${overallIndex}]="can0  545   [4]  0 0 0 0"\n`);
  overallIndex++;
}

/*
array[0]="can0  329   [8]  E0 61 C6 E9 0 0 0 0"
array[1]="can0  316   [8]  E0 61 00 2D 0 0 E0 0"
array[2]="can0  545   [4]  0 0 0 0"
*/
