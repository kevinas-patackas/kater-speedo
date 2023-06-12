import { GaugesConfig } from '@kater-speedo/types';
import * as fs from 'fs';
import * as path from 'path';
import { generateCircularGaugeCssClasses } from './circular-generator';
import { generateLinearGaugeCssClasses } from './linear-generator';
import { generateSimpleTextCssClasses } from './simple-text-generator';

export function generateCss(config: GaugesConfig) {
  const configRootPath = path.join(__dirname, 'assets');
  const pathToCssFile = path.join(configRootPath, 'gauges-styles.css');

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

      case 'simple-text':
        cssStrings.push(
          generateSimpleTextCssClasses(gauge.topic, gauge.config)
        );
        break;

      default:
        break;
    }
  }

  fs.writeFileSync(pathToCssFile, cssStrings.join(' '));
}
