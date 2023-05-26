import { GaugesConfig, TechnicalSocketTopic } from '@kater-speedo/types';
import * as fs from 'fs';
import * as path from 'path';
import { generateCss } from '../css-generator';
import { SocketServer } from '../socket';
import { getDefaultAltConfig } from './default-configs/default-alt-config';
import { getDefaultBigConfig } from './default-configs/default-big-config';
import { getDefaultConfig } from './default-configs/default-config';
import { getLinearConfig } from './default-configs/default-linear-config';
import { getDefaultModernAltConfig } from './default-configs/default-modern-alt-config';
import { getDefaultModernConfig } from './default-configs/default-modern-config';
import { getDefaultAltBigConfig } from './default-configs/default-alt-big-config';

const configRootPath = path.join(__dirname, 'assets');
const presetsPath = path.join(configRootPath, 'presets');
const pathToConfigFile = path.join(configRootPath, 'config.json');

export function setPresetByName(presetName: string) {
  const pathToPresetFile = path.join(presetsPath, `${presetName}.json`);

  if (fileExists(pathToPresetFile)) {
    const rawConfig = fs.readFileSync(pathToPresetFile);
    const config: GaugesConfig = JSON.parse(rawConfig.toString());

    generateCss(config);
    setGaugesConfig(config);
    const socketServer = SocketServer.getInstance();
    socketServer.sendMessage(
      TechnicalSocketTopic.ConfigChanged,
      TechnicalSocketTopic.ConfigChanged
    );
  }
}

export function getGaugesConfig() {
  if (fileExists(pathToConfigFile)) {
    const rawConfig = fs.readFileSync(pathToConfigFile);
    const config: GaugesConfig = JSON.parse(rawConfig.toString());

    return config;
  }

  const defaultConfig = getDefaultConfig();
  setGaugesConfig(defaultConfig);

  return defaultConfig;
}

export function setGaugesConfig(config: GaugesConfig) {
  fs.writeFileSync(pathToConfigFile, JSON.stringify(config, null, 2));
}

export function createGaugesConfigPresets() {
  const presets = [
    getDefaultConfig(),
    getDefaultAltConfig(),
    getDefaultModernAltConfig(),
    getDefaultModernConfig(),
    getLinearConfig(),
    getDefaultBigConfig(),
    getDefaultAltBigConfig(),
  ];

  if (!fileExists(presetsPath)) {
    fs.mkdirSync(presetsPath);
  }

  for (const [index, preset] of presets.entries()) {
    fs.writeFileSync(
      path.join(presetsPath, `preset-${index}.json`),
      JSON.stringify(preset, null, 2)
    );
  }
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
