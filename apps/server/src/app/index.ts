import { CanDataId, CanOutput, SocketTopic } from '@kater-speedo/types';
import { calculateRPM } from './calculators/rpm-calculator';
import { calculateTemperature } from './calculators/temperature-calculator';
import { canEvents, startCanReading } from './parsers/can';
import { SocketServer } from './socket';

export function start() {
  let temp: number;
  let rpm: number;

  const socketServer = SocketServer.getInstance();

  startCanReading();
  canEvents.on('data', (data: CanOutput) => {
    console.log('lol');
    switch (data.id) {
      case CanDataId.Temperature:
        if (Number(calculateTemperature(data).toFixed(0)) !== temp) {
          temp = Number(calculateTemperature(data).toFixed(0));
          socketServer.sendMessage(SocketTopic.Temperature, temp);
        }
        break;
      case CanDataId.RPM:
        rpm = Number(calculateRPM(data).toFixed(0));
        socketServer.sendMessage(SocketTopic.RPM, rpm);
        break;

      default:
        break;
    }

    clearLines(4);
    process.stdout.write(`===================================\n`);
    process.stdout.write(`TEMPERATURE: ${temp}\n`);
    process.stdout.write(`RPM:         ${rpm}\n`);
    process.stdout.write(`===================================`);
  });
}

function clearLines(n: number) {
  for (let i = 0; i < n; i++) {
    const y = i === 0 ? null : -1;
    process.stdout.moveCursor(0, y);
    process.stdout.clearLine(1);
  }
  process.stdout.cursorTo(0);
}
