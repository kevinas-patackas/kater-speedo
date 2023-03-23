import { GpsdOutput } from '@kater-speedo/types';
import { EventEmitter } from 'events';
import { Options, PythonShell } from 'python-shell';
import { environment } from '../../environments/environment';

export const gpsdEvents = new EventEmitter();

export function startGpsdReading() {
  const options: Options = {
    mode: 'text',
    pythonPath: process.env['PYTHON_PATH'],
    pythonOptions: ['-u'],
    scriptPath: environment.scriptsPath,
  };

  const pyshell = new PythonShell(environment.gpsdScript, options);

  pyshell.on('message', function (data) {
    const line = JSON.parse(JSON.stringify(String(data)).replace('\\n', ''));
    gpsdEvents.emit('data', parseGpsdOutput(line));
  });
}

const parseGpsdOutput = (line: string): GpsdOutput => {
  const parts = line
    .split(' ')
    .filter((i) => i)
    .map((i) => i.trim());
  const [topic, value] = parts;
  return {
    topic,
    value,
  };
};
