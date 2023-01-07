import * as tinygradient from 'tinygradient';
import { CircularGaugeClassDefinition, CssClassObject } from './types';
import { stylesToString } from './utils';

export function generateCircularGaugeCssClasses(
  name: string,
  setup: CircularGaugeClassDefinition
) {
  const classObjects: CssClassObject[] = [
    {
      name: `${setup.type}-${name}-container`,
      styles: {
        position: 'relative',
        height: `${setup.sizes.container}rem`,
        width: `${setup.sizes.container}rem`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    {
      name: `${setup.type}-${name}-ring-danger`,
      styles: getConicCircileStyleObject({
        size: setup.sizes.gauge + setup.sizes.danger,
        backgroundColor:
          'conic-gradient(transparent 0% 60%, red 60% 75%, transparent 75%)',
      }),
    },
    {
      name: `${setup.type}-${name}-ring-outer`,
      styles: getConicCircileStyleObject({
        size: setup.sizes.gauge,
        backgroundColor: 'conic-gradient(white 0% 75%, transparent 75%)',
      }),
    },
    {
      name: `${setup.type}-${name}-ring-outer-spacer`,
      styles: getCircleStyleObject({
        color: 'black',
        size: setup.sizes.gauge - setup.sizes.outline,
      }),
    },
    {
      name: `${setup.type}-${name}-gauge-background`,
      styles: getConicCircileStyleObject({
        size:
          setup.sizes.gauge - setup.sizes.outline - setup.sizes.outlineSpacer,
        backgroundColor: 'conic-gradient(#333333 0% 75%, transparent 75%)',
      }),
    },
    {
      name: `${setup.type}-${name}-ring-inner`,
      styles: getCircleStyleObject({
        color: 'black',
        size:
          setup.sizes.gauge -
          setup.sizes.outline -
          setup.sizes.outlineSpacer -
          setup.sizes.tick,
      }),
    },
    {
      name: `${setup.type}-${name}-display-container`,
      styles: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
    },
    {
      name: `${setup.type}-${name}-display-text-base`,
      styles: {
        width: '100%',
        textAlign: 'center',
        fontFamily: 'digital-clock-font-bold',
        color: 'white',
      },
    },
    {
      name: `${setup.type}-${name}-display-text-label`,
      styles: {
        lineHeight: '1',
        fontSize: `${setup.sizes.label}rem`,
      },
    },
    {
      name: `${setup.type}-${name}-display-text-value`,
      styles: {
        lineHeight: '1',
        fontSize: `${setup.sizes.value}rem`,
      },
    },
    ...generateSegmentDividerClasses(name, setup),
    ...generateGaugeValueClasses(name, setup),
  ];

  const classes = classObjects.map(
    (i) => `.${i.name} { ${stylesToString(i.styles)} }`
  );

  return classes.join(' ');
}

function generateSegmentDividerClasses(
  name: string,
  setup: CircularGaugeClassDefinition
): CssClassObject[] {
  const angle = 270 / setup.segments;
  const start = -135;
  const size =
    setup.sizes.gauge - setup.sizes.outline - setup.sizes.outlineSpacer;

  const result: CssClassObject[] = [];

  for (let i = -1; i < setup.segments + 1; i++) {
    result.push({
      name: `${setup.type}-${name}-segment-divider-rotate-${i + 1}`,
      styles: {
        rotate: `${start + i * angle}deg`,
      },
    });
  }

  result.push({
    name: `${setup.type}-${name}-segment-divider-base`,
    styles: {
      position: 'absolute',
      height: `${size}rem`,
      width: `${setup.sizes.segmentDivider}rem`,
    },
  });

  result.push({
    name: `${setup.type}-${name}-segment-divider-color`,
    styles: {
      backgroundColor: 'black',
      height: '50%',
      width: '100%',
    },
  });

  return result;
}

function generateGaugeValueClasses(
  name: string,
  setup: CircularGaugeClassDefinition
): CssClassObject[] {
  const size =
    setup.sizes.gauge - setup.sizes.outline - setup.sizes.outlineSpacer;

  const result: CssClassObject[] = [];

  result.push({
    name: `${setup.type}-${name}-gauge-value-base`,
    styles: {
      position: 'absolute',
      height: `${size}rem`,
      width: `${size}rem`,
      borderRadius: '9999px',
      rotate: '-135deg',
    },
  });

  const gradient = tinygradient([
    {
      color: '#00ff00',
      pos: setup.values.good.min / setup.values.max,
    },
    {
      color: '#00ff00',
      pos: setup.values.good.max / setup.values.max,
    },
    {
      color: '#ffff00',
      pos: setup.values.warning.min / setup.values.max,
    },
    {
      color: '#ffff00',
      pos: setup.values.warning.max / setup.values.max,
    },
    {
      color: '#ff0000',
      pos: setup.values.error.min / setup.values.max,
    },
    {
      color: '#ff0000',
      pos: setup.values.error.max / setup.values.max,
    },
  ]);
  const colors = gradient
    .rgb(setup.values.max - setup.values.min + 1)
    .map((i) => `#${i.toHex()}`);

  for (let i = setup.values.min; i <= setup.values.max; i++) {
    const percent = 0.75 * i;
    result.push({
      name: `${setup.type}-${name}-gauge-value-${i}`,
      styles: {
        background: `conic-gradient(transparent 0%, ${colors[i]} 0% ${percent}%, transparent ${percent}%)`,
      },
    });
  }

  result.push({
    name: `${setup.type}-${name}-gauge-value-min`,
    styles: {
      background: `conic-gradient(transparent 0%, ${colors[0]} 0% 0%, transparent 75%)`,
    },
  });

  result.push({
    name: `${setup.type}-${name}-gauge-value-max`,
    styles: {
      background: `conic-gradient(transparent 0%, ${
        colors[colors.length - 1]
      } 0% 75%, transparent 75%)`,
    },
  });

  return result;
}

const getConicCircileStyleObject = ({
  size,
  backgroundColor,
}: {
  size: number;
  backgroundColor: string;
}) => ({
  position: 'absolute',
  height: `${size}rem`,
  width: `${size}rem`,
  background: backgroundColor,
  borderRadius: '9999px',
  rotate: '-135deg',
});

const getCircleStyleObject = ({
  size,
  color,
}: {
  size: number;
  color: string;
}) => ({
  position: 'absolute',
  height: `${size}rem`,
  width: `${size}rem`,
  backgroundColor: color,
  borderRadius: '9999px',
});
