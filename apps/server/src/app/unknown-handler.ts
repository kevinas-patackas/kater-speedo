// THIS IS TEMPORARY UNTIL KNOWN HOW THE DATA LOOKS LIKE

import { SocketTopic } from '@kater-speedo/types';
import { canEvents } from './parsers/can';
import { SocketServer } from './socket';
import { NoiseReducer } from './utils/noise-reducer';

export function handleUknownEvents() {
  const speedNoiseReducer = new NoiseReducer({
    initialValue: 0,
    sampleCount: 1,
  });

  const fuelNoiseReducer = new NoiseReducer({
    initialValue: 0,
    sampleCount: 1,
  });

  const legNoiseReducer = new NoiseReducer({
    initialValue: 0,
    sampleCount: 1,
  });

  const socketServer = SocketServer.getInstance();

  let speedCurMockIndex = 0;
  let fuelCurMockIndex = 0;
  let legCurMockIndex = 0;

  speedNoiseReducer.events.on('changed', (value: number) => {
    socketServer.sendMessage(SocketTopic.Speed, value);
  });

  fuelNoiseReducer.events.on('changed', (value: number) => {
    socketServer.sendMessage(SocketTopic.Fuel, value);
  });

  legNoiseReducer.events.on('changed', (value: number) => {
    socketServer.sendMessage(SocketTopic.Trim, value);
  });

  canEvents.on('data', () => {
    speedCurMockIndex++;
    speedNoiseReducer.next(Number(speedMock[speedCurMockIndex].toFixed(0)));
    if (speedCurMockIndex === speedMock.length - 1) {
      speedCurMockIndex = 0;
    }

    fuelCurMockIndex++;
    if (fuelCurMockIndex === fuelMock.length - 1) {
      fuelCurMockIndex = 0;
    }
    fuelNoiseReducer.next(Number(fuelMock[fuelCurMockIndex].toFixed(0)));

    legCurMockIndex++;
    if (legCurMockIndex === legMock.length - 1) {
      legCurMockIndex = 0;
    }
    legNoiseReducer.next(Number(legMock[legCurMockIndex].toFixed(0)));
  });
}

const speedMock = [
  0, 1, 3, 5, 6, 7, 9, 10, 12, 14, 16, 18, 19, 21, 22, 24, 26, 27, 28, 29, 30,
  32, 34, 36, 38, 40, 41, 42, 44, 46, 47, 49, 50, 52, 53, 55, 57, 58, 60, 62,
  63, 65, 66, 68, 70, 72, 73, 74, 75, 77, 78, 80, 81, 82, 84, 85, 87, 89, 91,
  92, 94, 95, 97, 99, 100, 101, 103, 105, 107, 109, 109, 107, 105, 103, 101,
  100, 99, 97, 95, 94, 92, 91, 89, 87, 85, 84, 82, 81, 80, 78, 77, 75, 74, 73,
  72, 70, 68, 66, 65, 63, 62, 60, 58, 57, 55, 53, 52, 50, 49, 47, 46, 44, 42,
  41, 40, 38, 36, 34, 32, 30, 29, 28, 27, 26, 24, 22, 21, 19, 18, 16, 14, 12,
  10, 9, 7, 6, 5, 3, 1, 0,
];

const fuelMock = [
  0, 0, 0, 1, 1, 1, 2, 2, 2, 4, 4, 4, 6, 6, 6, 7, 7, 7, 9, 9, 9, 10, 10, 10, 12,
  12, 12, 13, 13, 13, 15, 15, 15, 17, 17, 17, 18, 18, 18, 20, 20, 20, 21, 21,
  21, 22, 22, 22, 24, 24, 24, 26, 26, 26, 27, 27, 27, 29, 29, 29, 31, 31, 31,
  32, 32, 32, 33, 33, 33, 35, 35, 35, 36, 36, 36, 37, 37, 37, 39, 39, 39, 40,
  40, 40, 41, 41, 41, 43, 43, 43, 45, 45, 45, 46, 46, 46, 48, 48, 48, 49, 49,
  49, 50, 50, 50, 51, 51, 51, 52, 52, 52, 54, 54, 54, 56, 56, 56, 58, 58, 58,
  59, 59, 59, 60, 60, 60, 61, 61, 61, 63, 63, 63, 65, 65, 65, 67, 67, 67, 68,
  68, 68, 70, 70, 70, 72, 72, 72, 73, 73, 73, 74, 74, 74, 75, 75, 75, 76, 76,
  76, 78, 78, 78, 80, 80, 80, 82, 82, 82, 83, 83, 83, 84, 84, 84, 85, 85, 85,
  87, 87, 87, 89, 89, 89, 90, 90, 90, 91, 91, 91, 93, 93, 93, 95, 95, 95, 96,
  96, 96, 97, 97, 97, 99, 99, 99, 99, 99, 99, 97, 97, 97, 96, 96, 96, 95, 95,
  95, 93, 93, 93, 91, 91, 91, 90, 90, 90, 89, 89, 89, 87, 87, 87, 85, 85, 85,
  84, 84, 84, 83, 83, 83, 82, 82, 82, 80, 80, 80, 78, 78, 78, 76, 76, 76, 75,
  75, 75, 74, 74, 74, 73, 73, 73, 72, 72, 72, 70, 70, 70, 68, 68, 68, 67, 67,
  67, 65, 65, 65, 63, 63, 63, 61, 61, 61, 60, 60, 60, 59, 59, 59, 58, 58, 58,
  56, 56, 56, 54, 54, 54, 52, 52, 52, 51, 51, 51, 50, 50, 50, 49, 49, 49, 48,
  48, 48, 46, 46, 46, 45, 45, 45, 43, 43, 43, 41, 41, 41, 40, 40, 40, 39, 39,
  39, 37, 37, 37, 36, 36, 36, 35, 35, 35, 33, 33, 33, 32, 32, 32, 31, 31, 31,
  29, 29, 29, 27, 27, 27, 26, 26, 26, 24, 24, 24, 22, 22, 22, 21, 21, 21, 20,
  20, 20, 18, 18, 18, 17, 17, 17, 15, 15, 15, 13, 13, 13, 12, 12, 12, 10, 10,
  10, 9, 9, 9, 7, 7, 7, 6, 6, 6, 4, 4, 4, 2, 2, 2, 1, 1, 1, 0, 0, 0,
];

const legMock = [
  100, 100, 100, 100, 100, 100, 100, 100, 99, 98, 97, 96, 95, 94, 93, 92, 91,
  90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72,
  71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53,
  52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34,
  33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15,
  14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
  80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
  99, 100,
];
