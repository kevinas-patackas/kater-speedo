import { CanOutput, CanDataId } from '@kater-speedo/types';
import { canEvents, startCanReading } from './app/can-parser';

startCanReading();
canEvents.on('data', (data: CanOutput) => {
  if (data.id === CanDataId.Temperature) {
    const temp = calculateTemperature(data);

    clearLines(4);
    process.stdout.write(`===================================\n`);
    process.stdout.write(`TEMPERATURE:\n${temp.toFixed(0)}\n`);
    process.stdout.write(`===================================`);
  }
});

const calculateTemperature = (data: CanOutput) =>
  0.75 * parseInt(data.bytes[1], 16) - 48.373;

function clearLines(n: number) {
  for (let i = 0; i < n; i++) {
    const y = i === 0 ? null : -1;
    process.stdout.moveCursor(0, y);
    process.stdout.clearLine(1);
  }
  process.stdout.cursorTo(0);
}
