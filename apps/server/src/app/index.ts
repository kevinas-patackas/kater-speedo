import { CanDataId, CanOutput } from '@kater-speedo/types';
import { canEvents, startCanReading } from './can-parser';
import { calculateTemperature } from './calculators/temperature-calculator';
import { calculateRPM } from './calculators/rpm-calculator';

export function start() {
  let temp = 0;
  let rpm = 0;

  startCanReading();
  canEvents.on('data', (data: CanOutput) => {
    switch (data.id) {
      case CanDataId.Temperature:
        temp = calculateTemperature(data);
        break;
      case CanDataId.RPM:
        rpm = calculateRPM(data);
        break;

      default:
        break;
    }

    clearLines(4);
    process.stdout.write(`===================================\n`);
    process.stdout.write(`TEMPERATURE: ${temp.toFixed(0)}\n`);
    process.stdout.write(`RPM:         ${rpm.toFixed(0)}\n`);
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
