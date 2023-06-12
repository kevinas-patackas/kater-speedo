import { SimpleTextConfig } from '@kater-speedo/types';
import { stylesToString } from './utils';
import { CssClassObject } from './types';

export function generateSimpleTextCssClasses(
  name: string,
  config: SimpleTextConfig
) {
  const classObjects: CssClassObject[] = [
    {
      name: `${config.type}-${name}-container`,
      styles: {
        display: 'flex',
        flexWrap: 'wrap',
        // border: '2px solid red',
        width: `${config.sizes.width}px`,
        height: `${config.sizes.height}px`,
        alignItems: 'center',
        justifyContent: config.display.horizontalAlign,
      },
    },
    {
      name: `${config.type}-${name}-display-prefix`,
      styles: {
        color: 'white',
        fontFamily: 'digital-clock-font-bold',
        fontSize: `${config.sizes.prefixSize}px`,
        lineHeight: '0.75',
      },
    },
    {
      name: `${config.type}-${name}-display-value`,
      styles: {
        color: 'white',
        fontFamily: 'digital-clock-font-bold',
        fontSize: `${config.sizes.size}px`,
        lineHeight: '0.75',
      },
    },
    {
      name: `${config.type}-${name}-display-postfix`,
      styles: {
        color: 'white',
        fontFamily: 'digital-clock-font-bold',
        fontSize: `${config.sizes.postfixSize}px`,
        lineHeight: '0.75',
      },
    },
  ];

  const classes = classObjects.map(
    (i) => `.${i.name} { ${stylesToString(i.styles)} }`
  );

  return Array.from(new Set(classes)).join(' ');
}
