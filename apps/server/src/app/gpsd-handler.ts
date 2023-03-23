import { GpsdDataId, GpsdOutput, SocketTopic } from '@kater-speedo/types';
import { gpsdEvents, startGpsdReading } from './parsers/gpsd';
import { SocketServer } from './socket';
import { NoiseReducer } from './utils/noise-reducer';

export function handleGpsdEvents() {
  const socketServer = SocketServer.getInstance();

  const speedNoiseReducer = new NoiseReducer({
    initialValue: 0,
    sampleCount: 2,
  });

  speedNoiseReducer.events.on('changed', (value: number) => {
    socketServer.sendMessage(SocketTopic.Speed, value);
  });

  startGpsdReading();
  gpsdEvents.on('data', (data: GpsdOutput) => {
    switch (data.topic) {
      case GpsdDataId.Speed:
        speedNoiseReducer.next(Number(calculateSpeed(data).toFixed(0)));
        break;

      default:
        break;
    }
  });
}

const calculateSpeed = (data: GpsdOutput) => {
  if (!data.value) {
    return 0;
  }

  const speedString = data.value.replace(',', '.');
  const speed = Number(speedString);

  if (isNaN(speed)) {
    return 0;
  }

  return speed;
};
