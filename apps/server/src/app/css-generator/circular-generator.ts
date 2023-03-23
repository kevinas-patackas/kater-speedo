import { CircularGaugeConfig } from '@kater-speedo/types';
import * as tinygradient from 'tinygradient';
import { CssClassObject } from './types';
import { stylesToString } from './utils';

export function generateCircularGaugeCssClasses(
  name: string,
  config: CircularGaugeConfig
) {
  const calcSizes = getSizes(config);

  const classObjects: CssClassObject[] = [
    {
      name: `${config.type}-${name}-container`,
      styles: {
        position: 'relative',
        height: `${config.sizes.container.base}px`,
        width: `${config.sizes.container.base}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // border: '2px solid red',
        overflow: 'hidden',
        paddingTop: `${config.sizes.container.padding.top}px`,
        paddingBottom: `${config.sizes.container.padding.bottom}px`,
        paddingLeft: `${config.sizes.container.padding.left}px`,
        paddingRight: `${config.sizes.container.padding.right}px`,
      },
    },
    {
      name: `${config.type}-${name}-sub-container`,
      styles: {
        position: 'relative',
        height: `${config.sizes.container.base}px`,
        width: `${config.sizes.container.base}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // border: '2px solid red',
      },
    },
    {
      name: `${config.type}-${name}-ring-outer`,
      styles: {
        ...(config.type === 'circular'
          ? getConicCircleStyleObject({
              size: calcSizes.outer,
              background: conicBackground('white'),
            })
          : getConicCircleStyleObject({
              size: calcSizes.outer,
              background: conicBackground('white', 0, 25),
              small: true,
            })),
        top: `${(config.sizes.container.base - calcSizes.outer) / 2}px`,
      },
    },
    {
      name: `${config.type}-${name}-ring-outer-spacer`,
      styles: {
        ...getCircleStyleObject({
          background: 'black',
          size: calcSizes.outerSpacer,
        }),
        top: `${(config.sizes.container.base - calcSizes.outerSpacer) / 2}px`,
      },
    },
    {
      name: `${config.type}-${name}-gauge-background`,
      styles:
        config.type === 'circular'
          ? getConicCircleStyleObject({
              size: calcSizes.gaugeBackground,
              background: conicBackground(config.colors.gaugeBackground),
            })
          : getConicCircleStyleObject({
              size: calcSizes.gaugeBackground,
              background: conicBackground(config.colors.gaugeBackground, 0, 25),
              small: true,
            }),
    },
    {
      name: `${config.type}-${name}-ring-inner`,
      styles: getCircleStyleObject({
        background: 'black',
        size: calcSizes.ringInner,
      }),
    },
    ...generateDangerIndicatorClasses(name, config),
    ...generateDisplayClasses(name, config),
    ...generateSegmentDividerClasses(name, config),
    ...generateDigitClasses(name, config),
    ...generateGaugeValueClasses(name, config),
  ];

  const classes = classObjects.map(
    (i) => `.${i.name} { ${stylesToString(i.styles)} }`
  );

  return Array.from(new Set(classes)).join(' ');
}

function generateDangerIndicatorClasses(
  name: string,
  config: CircularGaugeConfig
): CssClassObject[] {
  const calcSizes = getSizes(config);
  const dangerRanges = config.values.ranges.filter((i) => i.danger);

  const dangerPercents = dangerRanges
    .map((range) => ({
      ...range,
      min:
        ((range.min - config.values.min) /
          (config.values.max - config.values.min)) *
        100,
      max:
        ((range.max - config.values.min) /
          (config.values.max - config.values.min)) *
        100,
    }))
    .sort((a, b) => a.min - b.min);

  const parts = dangerPercents.map((i) => {
    const min = (i.min / 100) * (config.type === 'circular' ? 75 : 25);
    const max = (i.max / 100) * (config.type === 'circular' ? 75 : 25);
    return `transparent ${min}%, ${i.color} ${min}%, ${i.color} ${max}%, transparent ${max}%`;
  });

  return [
    {
      name: `${config.type}-${name}-ring-danger`,
      styles: getConicCircleStyleObject({
        size: calcSizes.danger,
        background: [
          'conic-gradient(transparent 0%',
          ...parts,
          ...(config.type === 'circular'
            ? ['transparent 75%)']
            : ['transparent 25%)']),
        ].join(', '),
        ...(config.type === 'circular' ? {} : { small: true }),
      }),
    },
  ];
}

function generateDisplayClasses(
  name: string,
  config: CircularGaugeConfig
): CssClassObject[] {
  return [
    {
      name: `${config.type}-${name}-display-container`,
      styles: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: `${config.sizes.display.padding.top}px`,
        paddingBottom: `${config.sizes.display.padding.bottom}px`,
        paddingLeft: `${config.sizes.display.padding.left}px`,
        paddingRight: `${config.sizes.display.padding.right}px`,
      },
    },
    {
      name: `${config.type}-${name}-display-text-base`,
      styles: {
        width: '100%',
        textAlign: 'center',
        fontFamily: 'digital-clock-font-bold',
        color: 'white',
      },
    },
    {
      name: `${config.type}-${name}-display-text-label`,
      styles: {
        lineHeight: '1',
        fontSize: `${config.sizes.label}px`,
      },
    },
    {
      name: `${config.type}-${name}-display-text-value`,
      styles: {
        lineHeight: '1',
        fontSize: `${config.sizes.value}px`,
      },
    },
  ];
}

function generateSegmentDividerClasses(
  name: string,
  setup: CircularGaugeConfig
): CssClassObject[] {
  const calcSizes = getSizes(setup);
  const angle =
    (setup.type === 'circular' ? 270 : 90) / setup.display.segments.count;
  const start = setup.type === 'circular' ? -135 : -45;
  const size =
    (calcSizes.outerSpacer - calcSizes.gaugeBackground) / 2 +
    calcSizes.gaugeBackground;

  const result: CssClassObject[] = [];

  for (let i = -1; i < setup.display.segments.count + 1; i++) {
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
      height: `${size}px`,
      width: `${setup.sizes.segmentDivider}px`,
    },
  });

  result.push({
    name: `${setup.type}-${name}-segment-divider-color`,
    styles: {
      background: 'black',
      height: '50%',
      width: '100%',
    },
  });

  return result;
}

function generateDigitClasses(name: string, setup: CircularGaugeConfig) {
  const calcSizes = getSizes(setup);
  const angle =
    (setup.type === 'circular' ? 270 : 90) /
    (setup.values.max - setup.values.min);
  const startAngle =
    (setup.type === 'circular' ? -135 : -45) - angle * setup.values.min;
  const result: CssClassObject[] = [];

  result.push({
    name: `${setup.type}-${name}-digits-base`,
    styles: {
      position: 'absolute',
      height: `${calcSizes.digitsRing}px`,
      width: '1px',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'digital-clock-font-bold',
      fontSize: `${setup.sizes.digits}px`,
    },
  });

  const digits = new Set<number>();
  for (let i = setup.values.min; i <= setup.values.max; i++) {
    const roundedValue =
      Math.round(i / setup.display.digits.rounding) *
      setup.display.digits.rounding;
    digits.add(roundedValue);
  }

  result.push(
    ...Array.from(digits).map((value) => ({
      name: `${setup.type}-${name}-digits-${value}`,
      styles: {
        rotate: `${startAngle + value * angle}deg`,
      },
    }))
  );

  return result;
}

function generateGaugeValueClasses(
  name: string,
  setup: CircularGaugeConfig
): CssClassObject[] {
  const size =
    setup.sizes.gauge - setup.sizes.outline - setup.sizes.outlineSpacer;

  const result = new Set<CssClassObject>();

  result.add({
    name: `${setup.type}-${name}-gauge-value-base`,
    styles: {
      position: 'absolute',
      height: `${size}px`,
      width: `${size}px`,
      borderRadius: '9999px',
      rotate: setup.type === 'circular' ? '-135deg' : '-45deg',
    },
  });

  const gradient = tinygradient(
    [
      ...setup.values.ranges.map((range) => ({
        color: range.color,
        pos: range.min / setup.values.max,
      })),
      ...setup.values.ranges.map((range) => ({
        color: range.color,
        pos: range.max / setup.values.max,
      })),
    ].sort((a, b) => a.pos - b.pos)
  );

  const colors = gradient.rgb(setup.values.max + 1).map((i) => `#${i.toHex()}`);

  for (let i = setup.values.min; i <= setup.values.max; i++) {
    const roundedValue =
      Math.round(i / setup.display.segments.rounding) *
      setup.display.segments.rounding;

    const angle =
      (setup.type === 'circular' ? 75 : 25) /
      (setup.values.max - setup.values.min);
    const startAngle = -angle * setup.values.min;
    const percent = angle * roundedValue + startAngle;

    result.add({
      name: `${setup.type}-${name}-gauge-value-${roundedValue}`,
      styles: {
        background: conicBackground(colors[roundedValue], 0, percent),
      },
    });
  }
  result.add({
    name: `${setup.type}-${name}-gauge-value-min`,
    styles: {
      background: conicBackground(colors[0], 0, 0),
    },
  });

  result.add({
    name: `${setup.type}-${name}-gauge-value-max`,
    styles: {
      background: conicBackground(
        colors[colors.length - 1],
        0,
        setup.type === 'circular' ? 75 : 25
      ),
    },
  });

  return Array.from(result);
}

function getSizes(setup: CircularGaugeConfig) {
  const danger = setup.sizes.gauge + setup.sizes.danger;
  const outer = setup.sizes.gauge;
  const outerSpacer = setup.sizes.gauge - setup.sizes.outline;
  const gaugeBackground = outerSpacer - setup.sizes.outlineSpacer;
  const ringInner = gaugeBackground - setup.sizes.tick;
  const digitsRing = setup.sizes.digitsRing;

  return {
    danger,
    outer,
    outerSpacer,
    gaugeBackground,
    ringInner,
    digitsRing,
  };
}

const conicBackground = (color: string, min?: number, max?: number) =>
  `conic-gradient(transparent 0% ${min ?? 0}%, ${color} ${min ?? 0}% ${
    max ?? 75
  }%, transparent ${max ?? 75}%)`;

const getConicCircleStyleObject = ({
  size,
  background,
  small,
}: {
  size: number;
  background: string;
  small?: boolean;
}) => ({
  position: 'absolute',
  height: `${size}px`,
  width: `${size}px`,
  background: background,
  borderRadius: '9999px',
  rotate: small ? '-45deg' : '-135deg',
});

const getCircleStyleObject = ({
  size,
  background,
}: {
  size: number;
  background: string;
}) => ({
  position: 'absolute',
  height: `${size}px`,
  width: `${size}px`,
  background,
  borderRadius: '9999px',
});
