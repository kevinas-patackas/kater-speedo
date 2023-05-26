import { CanDataId, CanOutput, SocketTopic } from '@kater-speedo/types';
import { canEvents, startCanReading } from './parsers/can';
import { SocketServer } from './socket';
import { NoiseReducer } from './utils/noise-reducer';
import { stringToBoolean } from './utils/utils';

export function handleCanEvents() {
  const socketServer = SocketServer.getInstance();

  const temperatureNoiseReducer = new NoiseReducer({
    initialValue: 0,
    sampleCount: 5,
  });
  const rpmNoiseReducer = new NoiseReducer({
    initialValue: 0,
    sampleCount: 5,
  });

  temperatureNoiseReducer.events.on('changed', (value: number) => {
    socketServer.sendMessage(SocketTopic.Temperature, value);
  });

  rpmNoiseReducer.events.on('changed', (value: number) => {
    socketServer.sendMessage(SocketTopic.RPM, value);
  });

  const shouldLogTemp =
    stringToBoolean(
      process.env[`LOG_TEMPERATURE`.toUpperCase().split('-').join('_')]
    ) || stringToBoolean(process.env['LOG_ALL']);

  const shouldLogRpm =
    stringToBoolean(
      process.env[`LOG_RPM`.toUpperCase().split('-').join('_')]
    ) || stringToBoolean(process.env['LOG_ALL']);

  startCanReading();
  canEvents.on('data', (data: CanOutput) => {
    switch (data.id) {
      case CanDataId.RPM:
        if (shouldLogRpm) {
          console.log(
            `RPM:`.padEnd(15, ' '),
            Number(calculateRPM(data).toFixed(0))
          );
        }
        rpmNoiseReducer.next(Number(calculateRPM(data).toFixed(0)));
        break;

      case CanDataId.Temperature:
        if (shouldLogTemp) {
          console.log(
            `TEMPERATURE:`.padEnd(15, ' '),
            calculateTemperature(data).toFixed(0)
          );
        }
        temperatureNoiseReducer.next(
          Number(calculateTemperature(data).toFixed(0))
        );
        break;

      default:
        break;
    }
  });
}

const calculateRPM = (data: CanOutput) =>
  parseInt(`${data.bytes[3]}${data.bytes[2]}`, 16) / 6.4;

const calculateTemperature = (data: CanOutput) =>
  0.75 * parseInt(data.bytes[1], 16) - 48.373;
