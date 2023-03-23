import { CanDataId, CanOutput, SocketTopic } from '@kater-speedo/types';
import { canEvents, startCanReading } from './parsers/can';
import { SocketServer } from './socket';
import { NoiseReducer } from './utils/noise-reducer';

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

  startCanReading();
  canEvents.on('data', (data: CanOutput) => {
    switch (data.id) {
      case CanDataId.RPM:
        rpmNoiseReducer.next(Number(calculateRPM(data).toFixed(0)));
        break;

      case CanDataId.Temperature:
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
