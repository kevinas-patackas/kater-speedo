import { GpsdOutput } from '@kater-speedo/types';
import { EventEmitter } from 'events';
import { Options, PythonShell } from 'python-shell';
import { environment } from '../../environments/environment';
import { prettyPrintPythonError, sleep, stringToBoolean } from '../utils/utils';

export const gpsdEvents = new EventEmitter();

export function startGpsdReading() {
  const options: Options = {
    mode: 'text',
    pythonPath: process.env['PYTHON_PATH'],
    pythonOptions: ['-u'],
    scriptPath: environment.scriptsPath,
  };
  const shouldLog =
    stringToBoolean(
      process.env[`LOG_GPSD`.toUpperCase().split('-').join('_')]
    ) || stringToBoolean(process.env['LOG_ALL']);
  const pyshell = new PythonShell(environment.gpsdScript, options);

  pyshell
    .on('message', function (data) {
      const line = JSON.parse(JSON.stringify(String(data)).replace('\\n', ''));
      if (shouldLog) {
        console.log('GPSD:'.padEnd(15, ' '), line);
      }
      gpsdEvents.emit('data', parseGpsdOutput(line));
    })
    .on('pythonError', function (data) {
      if (shouldLog) {
        prettyPrintPythonError('GPSD pythonError', data);
      }
    })
    .on('stderr', function (data) {
      if (shouldLog) {
        prettyPrintPythonError('GPSD stderr', data);
      }
    })
    .on('error', function (data) {
      if (shouldLog) {
        prettyPrintPythonError('GPSD error', data);
      }
    })
    .on('close', async function (data) {
      if (shouldLog) {
        prettyPrintPythonError('GPSD close', data);
      }
      console.log('Will restart GPSD in: 2s');
      await sleep(2000);
      startGpsdReading();
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
