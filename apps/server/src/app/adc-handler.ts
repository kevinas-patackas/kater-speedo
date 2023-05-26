import { AdcConfig, SocketTopic } from '@kater-speedo/types';
import { EventEmitter } from 'events';
import { Options, PythonShell } from 'python-shell';
import { environment } from '../environments/environment';
import * as fs from 'fs';
import * as path from 'path';
import { SocketServer } from './socket';
import { prettyPrintPythonError, sleep, stringToBoolean } from './utils/utils';

const configRootPath = path.join(__dirname, 'assets');
const adcConfigsPath = path.join(configRootPath, 'adc');

export function initAdcPath() {
  if (!fileExists(adcConfigsPath)) {
    fs.mkdirSync(adcConfigsPath);
  }
}

export function handleAdcEvents(topic: SocketTopic) {
  const socketServer = SocketServer.getInstance();

  startAdcReading(topic).on('data', (data: string) => {
    socketServer.sendMessage(topic, Number(data));
  });
}

function startAdcReading(topic: SocketTopic) {
  const adcEventEmitter = new EventEmitter();

  const adcConfig = getConfigByTopic(topic);

  const options: Options = {
    mode: 'text',
    pythonPath: process.env['PYTHON_PATH'],
    pythonOptions: ['-u'],
    scriptPath: environment.scriptsPath,
    args: [JSON.stringify(adcConfig)],
  };

  const shouldLog =
    stringToBoolean(
      process.env[`LOG_${topic}`.toUpperCase().split('-').join('_')]
    ) || stringToBoolean(process.env['LOG_ALL']);
  const pyshell = new PythonShell(environment.adcScript, options);

  pyshell
    .on('message', function (data) {
      const line = JSON.parse(JSON.stringify(String(data)).replace('\\n', ''));
      if (shouldLog) {
        console.log(`${topic}:`.padEnd(15, ' '), line);
      }
      adcEventEmitter.emit('data', line);
    })
    .on('pythonError', function (data) {
      if (shouldLog) {
        prettyPrintPythonError(`${topic} pythonError`, data);
      }
    })
    .on('stderr', function (data) {
      if (shouldLog) {
        prettyPrintPythonError(`${topic} stderr`, data);
      }
    })
    .on('error', function (data) {
      if (shouldLog) {
        prettyPrintPythonError(`${topic} error`, data);
      }
    })
    .on('close', async function (data) {
      if (shouldLog) {
        prettyPrintPythonError(`${topic} close`, data);
      }
      console.log(
        `Will restart ${topic} in: 2s`,
        process.env['LOG_oil-pressure']
      );
      await sleep(2000);
      startAdcReading(topic);
    });

  return adcEventEmitter;
}

function getConfigByTopic(topic: SocketTopic): AdcConfig {
  const configPath = path.join(adcConfigsPath, `${topic}.json`);

  if (!fileExists(configPath)) {
    const defaultConfig = getDefaultAdcConfig();
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
  }

  const rawConfig = fs.readFileSync(configPath);
  return JSON.parse(rawConfig.toString());
}

function fileExists(path: string) {
  try {
    if (fs.existsSync(path)) {
      return true;
    }
  } catch (err) {
    return false;
  }
}

function getDefaultAdcConfig(): AdcConfig {
  return {
    sleepTime: 1,
    activeSleepTime: 0.1,
    deviation: 100,
    adcAddress: '0x48',
    channel: 0,
    busnum: 1,
    gain: 1,
    valueRangeMap: {
      limitToMinMax: true,
      min: {
        reading: 0,
        value: 0,
      },
      max: {
        reading: 1000,
        value: 100,
      },
      ranges: [],
    },
  };
}
