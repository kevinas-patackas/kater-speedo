import { LinearGaugeConfig } from '@kater-speedo/types';
import tinygradient = require('tinygradient');
import { CssClassObject } from './types';
import { stylesToString } from './utils';

export function generateLinearGaugeCssClasses(
  name: string,
  config: LinearGaugeConfig
) {
  const classObjects: CssClassObject[] = [
    {
      name: `${config.type}-${name}-master-container`,
      styles: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    },
    {
      name: `${config.type}-${name}-container`,
      styles: {
        ...(config.type === 'linear-horizontal'
          ? {
              width: `${config.sizes.width}px`,
            }
          : {
              width: `100%`,
              height: `${config.sizes.width}px`,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }),
      },
    },
    {
      name: `${config.type}-${name}-outline-top`,
      styles: {
        ...(config.type === 'linear-horizontal'
          ? {
              width: '100%',
              height: `${config.sizes.outline}px`,
              marginBottom: `${config.sizes.outlineSpacer}px`,
            }
          : {
              height: '100%',
              width: `${config.sizes.outline}px`,
              marginRight: `${config.sizes.outlineSpacer}px`,
            }),

        background: 'white',
      },
    },
    {
      name: `${config.type}-${name}-outline-bottom`,
      styles: {
        ...(config.type === 'linear-horizontal'
          ? {
              width: '100%',
              height: `${config.sizes.outline}px`,
              marginTop: `${config.sizes.outlineSpacer}px`,
            }
          : {
              height: '100%',
              width: `${config.sizes.outline}px`,
              marginLeft: `${config.sizes.outlineSpacer}px`,
            }),

        background: 'white',
      },
    },
    {
      name: `${config.type}-${name}-gauge-container`,
      styles: {
        ...(config.type === 'linear-horizontal'
          ? {
              height: `${config.sizes.tick}px`,
            }
          : {
              width: `${config.sizes.tick}px`,
            }),
        position: 'relative',
      },
    },
    {
      name: `${config.type}-${name}-gauge-container-background`,
      styles: {
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: `50%`,
        background: `${config.colors.gaugeBackground}`,
        ...(config.display.segments.sliding
          ? {
              ...(config.type === 'linear-horizontal'
                ? {
                    height: `${config.sizes.tick * 0.65}px`,
                    width: `${config.sizes.width - config.sizes.tick * 0.5}px`,
                  }
                : {
                    width: `${config.sizes.tick * 0.65}px`,
                    height: `${config.sizes.width - config.sizes.tick * 0.5}px`,
                  }),
            }
          : {
              ...(config.type === 'linear-horizontal'
                ? {
                    height: `${config.sizes.tick}px`,
                    width: `100%`,
                  }
                : {
                    width: `${config.sizes.tick}px`,
                    height: `100%`,
                  }),
            }),
      },
    },
    {
      name: `${config.type}-${name}-dividers-container`,
      styles: {
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: `50%`,
        ...(config.type === 'linear-horizontal'
          ? {
              display: 'grid',
              gridTemplateColumns: `repeat(${config.display.segments.count}, 1fr)`,
              gridTemplateRows: '1fr',
              gridColumnGap: '0px',
              gridRowGap: '0px',
            }
          : {
              display: 'grid',
              gridTemplateColumns: '1fr',
              gridTemplateRows: 'repeat(10, 1fr)',
              gridColumnGap: '0px',
              gridRowGap: '0px',
            }),
        ...(config.display.segments.sliding
          ? {
              ...(config.type === 'linear-horizontal'
                ? {
                    height: `${config.sizes.tick * 0.65}px`,
                    width: `${config.sizes.width - config.sizes.tick * 0.5}px`,
                  }
                : {
                    width: `${config.sizes.tick * 0.65}px`,
                    height: `${config.sizes.width - config.sizes.tick * 0.5}px`,
                  }),
            }
          : {
              ...(config.type === 'linear-horizontal'
                ? {
                    height: `${config.sizes.tick}px`,
                    width: `100%`,
                  }
                : {
                    width: `${config.sizes.tick}px`,
                    height: `100%`,
                  }),
            }),
      },
    },
    {
      name: `${config.type}-${name}-divider`,
      styles: {
        ...(config.type === 'linear-horizontal'
          ? {
              width: '100%',
              borderLeft: `${config.sizes.segmentDivider}px solid black`,
              borderRight: `${config.sizes.segmentDivider}px solid black`,
            }
          : {
              // height: '100%',
              height: `${
                (config.display.segments.sliding
                  ? config.sizes.width - config.sizes.tick * 0.5
                  : config.sizes.width) / config.display.segments.count
              }px`,
              borderTop: `${config.sizes.segmentDivider}px solid black`,
              borderBottom: `${config.sizes.segmentDivider}px solid black`,
            }),
      },
    },
    {
      name: `${config.type}-${name}-digits-container`,
      styles: {
        display: 'flex',
        ...(config.type === 'linear-horizontal'
          ? {
              justifyContent: 'space-between',
            }
          : {
              width: '100%',
              justifyContent: 'center',
            }),
      },
    },
    {
      name: `${config.type}-${name}-digit`,
      styles: {
        color: 'white',
        fontFamily: 'digital-clock-font-bold',
        fontSize: `${config.sizes.digits}px`,
        lineHeight: '0.75',
        marginTop: `${config.sizes.digitsSpacer}px`,
        marginBottom: `${config.sizes.digitsSpacer}px`,
      },
    },
    {
      name: `${config.type}-${name}-display-container`,
      styles: {
        ...(config.type === 'linear-horizontal'
          ? {
              alignItems: 'end',
              width: `${config.sizes.width}px`,
            }
          : {
              alignItems: 'center',
              flexWrap: 'wrap',
              flexDirection: 'column-reverse',
              width: '100%',
            }),
        display: 'flex',
      },
    },
    {
      name: `${config.type}-${name}-display-value`,
      styles: {
        ...(config.type === 'linear-horizontal'
          ? {
              flexGrow: '1',
              ...(config.display.display.labelOnRight
                ? {
                    textAlign: 'right',
                  }
                : {}),
            }
          : {}),
        color: 'white',
        fontFamily: 'digital-clock-font-bold',
        fontSize: `${config.sizes.value}px`,
        lineHeight: '0.75',
        marginBottom: `${config.sizes.displaySpacer}px`,
      },
    },
    {
      name: `${config.type}-${name}-display-labels-container`,
      styles: {
        ...(config.type === 'linear-horizontal'
          ? {}
          : {
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'column',
              alignItems: 'center',
            }),
      },
    },
    {
      name: `${config.type}-${name}-display-label`,
      styles: {
        display: 'flex',
        justifyContent: 'right',
        color: 'white',
        fontFamily: 'digital-clock-font-bold',
        fontSize: `${config.sizes.label}px`,
        lineHeight: '0.75',
        marginBottom: `${config.sizes.displaySpacer}px`,
      },
    },
    {
      name: `${config.type}-${name}-display-sub-label`,
      styles: {
        display: 'flex',
        justifyContent: 'right',
        color: 'white',
        fontFamily: 'digital-clock-font-bold',
        fontSize: `${config.sizes.subLabel}px`,
        lineHeight: '0.75',
        marginBottom: `${config.sizes.displaySpacer}px`,
      },
    },
    ...generateGaugeValueClassObjects(name, config),
    ...generateDangerClassObject(name, config),
  ];

  const classes = classObjects.map(
    (i) => `.${i.name} { ${stylesToString(i.styles)} }`
  );

  return Array.from(new Set(classes)).join(' ');
}

function generateGaugeValueClassObjects(
  name: string,
  config: LinearGaugeConfig
): CssClassObject[] {
  const result = new Set<CssClassObject>();

  result.add({
    name: `${config.type}-${name}-gauge-value-base`,
    styles: {
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      top: '50%',
      left: '50%',
      width: '100%',
      height: '100%',
      ...(config.display.segments.sliding
        ? {
            ...(config.type === 'linear-horizontal'
              ? {
                  borderLeft: '1px solid black',
                  borderRight: '1px solid black',
                }
              : {
                  borderTop: '1px solid black',
                  borderBottom: '1px solid black',
                }),
          }
        : {}),
    },
  });

  const gradient = tinygradient(
    [
      ...config.values.ranges.map((range) => ({
        color: range.color,
        pos: range.min / config.values.max,
      })),
      ...config.values.ranges.map((range) => ({
        color: range.color,
        pos: range.max / config.values.max,
      })),
    ].sort((a, b) => a.pos - b.pos)
  );

  const colors = gradient
    .rgb(config.values.max + 1)
    .map((i) => `#${i.toHex()}`);

  for (let i = config.values.min; i <= config.values.max; i++) {
    const roundedValue =
      Math.round(i / config.display.segments.rounding) *
      config.display.segments.rounding;

    const percent =
      ((roundedValue - config.values.min) /
        (config.values.max - config.values.min)) *
      100;

    if (config.display.segments.sliding) {
      const widthInPercent = (config.sizes.slider * 100) / config.sizes.width;
      const availableWidth = 100 - widthInPercent;
      const start = (percent / 100) * availableWidth;

      result.add({
        name: `${config.type}-${name}-gauge-value-${roundedValue}`,
        styles: {
          background: `linear-gradient(${
            config.type === 'linear-horizontal' ? 90 : 0
          }deg, transparent 0%, transparent ${start}%, ${
            colors[roundedValue]
          } ${start}%, ${colors[roundedValue]} ${
            start + widthInPercent
          }%, transparent ${start + widthInPercent}%, transparent 100%)`,
        },
      });
    } else {
      result.add({
        name: `${config.type}-${name}-gauge-value-${roundedValue}`,
        styles: {
          background: `linear-gradient(${
            config.type === 'linear-horizontal' ? 90 : 0
          }deg, ${colors[roundedValue]} 0%, ${
            colors[roundedValue]
          } ${percent}%, transparent ${percent}%, transparent 100%)`,
        },
      });
    }
  }

  if (config.display.segments.sliding) {
    const widthInPercent = (config.sizes.slider * 100) / config.sizes.width;
    result.add({
      name: `${config.type}-${name}-gauge-value-min`,
      styles: {
        background: `linear-gradient(${
          config.type === 'linear-horizontal' ? 90 : 0
        }deg, ${colors[0]} 0%, ${
          colors[0]
        } ${widthInPercent}%, transparent 0%, transparent 100%)`,
      },
    });

    result.add({
      name: `${config.type}-${name}-gauge-value-max`,
      styles: {
        background: `linear-gradient(${
          config.type === 'linear-horizontal' ? 90 : 0
        }deg, transparent 0%, transparent ${100 - widthInPercent}%, ${
          colors[colors.length - 1]
        } ${100 - widthInPercent}%, ${
          colors[colors.length - 1]
        } 100%, transparent 100%, transparent 100%)`,
      },
    });
  } else {
    result.add({
      name: `${config.type}-${name}-gauge-value-min`,
      styles: {
        background: `linear-gradient(${
          config.type === 'linear-horizontal' ? 90 : 0
        }deg, ${colors[0]} 0%, ${
          colors[0]
        } 0%, transparent 0%, transparent 100%)`,
      },
    });

    result.add({
      name: `${config.type}-${name}-gauge-value-max`,
      styles: {
        background: `linear-gradient(${
          config.type === 'linear-horizontal' ? 90 : 0
        }deg, ${colors[colors.length - 1]} 0%, ${
          colors[colors.length - 1]
        } 100%, transparent 100%, transparent 100%)`,
      },
    });
  }

  return Array.from(result);
}

function generateDangerClassObject(
  name: string,
  config: LinearGaugeConfig
): CssClassObject[] {
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

  const parts = dangerPercents.map(
    (i) =>
      `transparent ${i.min}%, ${i.color} ${i.min}%, ${i.color} ${i.max}%, transparent ${i.max}%`
  );

  return [
    {
      name: `${config.type}-${name}-danger`,
      styles: {
        ...(config.type === 'linear-horizontal'
          ? {
              // width: '100%',
              width: `${config.sizes.width}px`,
              height: `${config.sizes.danger}px`,
            }
          : {
              // height: '100%',
              height: `${config.sizes.width}px`,
              width: `${config.sizes.danger}px`,
            }),
        background: [
          `linear-gradient(${
            config.type === 'linear-horizontal' ? 90 : 0
          }deg, transparent 0%`,
          ...parts,
          'transparent 100%)',
        ].join(', '),
      },
    },
  ];
}
