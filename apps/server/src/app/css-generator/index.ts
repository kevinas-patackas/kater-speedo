import { GaugesConfig } from '@kater-speedo/types';
import * as fs from 'fs';
import * as path from 'path';
import { generateCircularGaugeCssClasses } from './circular-generator';
import { getDefaultAltConfig } from './default-alt-config';
import { getDefaultConfig } from './default-config';
import { getDefaultModernAltConfig } from './default-modern-alt-config';
import { getDefaultModernConfig } from './default-modern-config';
import { getLinearConfig } from './default-linear-config';
import { generateLinearGaugeCssClasses } from './linear-generator';

export function generateCss() {
  const configRootPath = path.join(__dirname, 'assets');

  // if (!fileExists(`${configRootPath}/config.json`)) {
  console.log('CONFIG DOES NOT EXIST, CREATING DEFAULT');
  const defaultConfig = getDefaultConfig();
  // const defaultConfig = getDefaultAltConfig();
  // const defaultConfig = getDefaultModernConfig();
  // const defaultConfig = getDefaultModernAltConfig();
  // const defaultConfig = getLinearConfig();
  fs.writeFileSync(
    `${configRootPath}/config.json`,
    JSON.stringify(defaultConfig, null, 2)
  );
  // }

  const rawConfig = fs.readFileSync(`${configRootPath}/config.json`);
  const config: GaugesConfig = JSON.parse(rawConfig.toString());

  const cssStrings = [];
  for (const gauge of config.gauges) {
    console.log(`Generating style for: ${gauge.topic}`);
    switch (gauge.config.type) {
      case 'circular':
      case 'half-circular':
        cssStrings.push(
          generateCircularGaugeCssClasses(gauge.topic, gauge.config)
        );
        break;

      case 'linear-horizontal':
      case 'linear-vertical':
        cssStrings.push(
          generateLinearGaugeCssClasses(gauge.topic, gauge.config)
        );
        break;

      default:
        break;
    }
  }

  fs.writeFileSync(`${configRootPath}/gauges-styles.css`, cssStrings.join(' '));
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
