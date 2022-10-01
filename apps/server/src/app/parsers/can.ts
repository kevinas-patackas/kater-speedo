import { CanOutput } from '@kater-speedo/types';
import { spawn } from 'child_process';
import { environment } from '../../environments/environment';
import { EventEmitter } from 'events';

export const canEvents = new EventEmitter();

export function startCanReading() {
  const ls = spawn(environment.canCommand);

  ls.stdout.on('data', (data) => {
    const line = JSON.parse(JSON.stringify(String(data)).replace('\\n', ''));
    canEvents.emit('data', parseCanOutput(line));
  });
}

const parseCanOutput = (line: string): CanOutput => {
  const parts = line.split(' ').filter((i) => i);
  const [canPort, id, byteCount, ...bytes] = parts;
  return {
    canPort,
    id,
    byteCount,
    bytes,
  };
};
