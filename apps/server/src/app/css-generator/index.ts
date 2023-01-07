import { SocketTopic } from '@kater-speedo/types';
import { generateCircularGaugeCssClasses } from './circular-generator';
import { speedSetup } from './default-config';
import * as tinygradient from 'tinygradient';

export function generateCss() {
  const one = generateCircularGaugeCssClasses(SocketTopic.Speed, speedSetup);
  console.log('\n\n=====================================\n\n');
  console.log(one);
  console.log('\n\n=====================================\n\n');

  const gradient = tinygradient(['#ff0000', '#00ff00', '#0000ff']);

  console.log(gradient.rgb(6).map((i) => i.toHex()));
  console.log('\n\n=====================================\n\n');
}
