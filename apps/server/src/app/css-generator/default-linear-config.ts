import {
  CircularGaugeConfig,
  GaugesConfig,
  LinearGaugeConfig,
  SocketTopic,
} from '@kater-speedo/types';

export function getLinearConfig(): GaugesConfig {
  return {
    gauges: [
      {
        topic: SocketTopic.RPM,
        config: rpmSetup,
        position: {
          rotation: 0,
          x: 0,
          y: -40 + 20,
        },
      },
      {
        topic: SocketTopic.Temperature,
        config: tempSetup,
        position: {
          rotation: 0,
          x: 620,
          y: -40 + 20,
        },
      },
      {
        topic: SocketTopic.Speed,
        config: speedSetup,
        position: {
          rotation: 0,
          x: -600,
          y: -78 + 20,
        },
      },
      {
        topic: SocketTopic.Trim,
        config: trimSetup,
        position: {
          rotation: 0,
          x: 620,

          y: 221,
        },
      },
      {
        topic: SocketTopic.Fuel,
        config: fuelSetup,
        position: {
          rotation: 0,
          x: -600,
          y: 215,
        },
      },
      {
        topic: SocketTopic.Voltage,
        config: voltageSetup,
        position: {
          rotation: 0,
          x: -150,

          y: 224,
        },
      },
      {
        topic: SocketTopic.OilPressure,
        config: oilPressureSetup,
        position: {
          rotation: 0,
          x: 150,
          y: 224,
        },
      },
    ],
  };
}

const speedSetup: LinearGaugeConfig = {
  type: 'linear-horizontal',
  sizes: {
    width: 550,
    outline: 0,
    outlineSpacer: 5,
    tick: 40,
    danger: 5,
    segmentDivider: 1,
    label: 24,
    subLabel: 45,
    value: 200,
    displaySpacer: 10,
    digits: 30,
    digitsSpacer: 15,
    slider: 25,
  },
  display: {
    segments: {
      sliding: false,
      count: 40,
      rounding: 2,
    },
    digits: {
      rounding: 10,
      roundDown: 1,
      overrides: {},
    },
    display: {
      label: '',
      subLabel: 'KM/H',
      roundingDown: 1,
    },
  },
  colors: {
    gaugeBackground: '#333333',
  },
  values: {
    min: 0,
    max: 80,
    ranges: [
      {
        min: 0,
        max: 35,
        color: '#89d6fb',
      },
      {
        min: 40,
        max: 50,
        color: '#E879F9',
      },
      {
        min: 60,
        max: 80,
        color: '#ff0000',
        danger: true,
      },
    ],
  },
};

const rpmSetup: LinearGaugeConfig = {
  type: 'linear-horizontal',
  sizes: {
    width: 550,
    outline: 0,
    outlineSpacer: 5,
    tick: 40,
    danger: 5,
    segmentDivider: 1,
    label: 24,
    subLabel: 45,
    value: 100,
    displaySpacer: 10,
    digits: 30,
    digitsSpacer: 15,
    slider: 25,
  },
  display: {
    segments: {
      sliding: false,
      count: 60,
      rounding: 100,
    },
    digits: {
      rounding: 1000,
      roundDown: 1000,
      overrides: {},
    },
    display: {
      labelOnRight: false,
      label: 'x100',
      subLabel: 'RPM',
      roundingDown: 100,
    },
  },
  colors: {
    gaugeBackground: '#333333',
  },
  values: {
    min: 0,
    max: 6000,
    ranges: [
      {
        min: 0,
        max: 3500,
        color: '#89d6fb',
      },
      {
        min: 4000,
        max: 4300,
        color: '#E879F9',
      },
      {
        min: 5000,
        max: 6000,
        color: '#ff0000',
        danger: true,
      },
    ],
  },
};

const fuelSetup: LinearGaugeConfig = {
  type: 'linear-horizontal',
  sizes: {
    width: 550,
    outline: 0,
    outlineSpacer: 5,
    tick: 40,
    danger: 5,
    segmentDivider: 1,
    label: 24,
    subLabel: 45,
    value: 100,
    displaySpacer: 10,
    digits: 30,
    digitsSpacer: 15,
    slider: 25,
  },
  display: {
    segments: {
      sliding: false,
      count: 20,
      rounding: 5,
    },
    digits: {
      rounding: 1,
      roundDown: 1,
      overrides: {
        100: 'full',
        0: 'empty',
      },
    },
    display: {
      labelOnRight: false,
      label: '%',
      subLabel: 'fuel',
      roundingDown: 1,
    },
  },
  colors: {
    gaugeBackground: '#333333',
  },
  values: {
    min: 0,
    max: 100,
    ranges: [
      {
        min: 0,
        max: 20,
        color: '#ff0000',
        danger: true,
      },
      {
        min: 30,
        max: 40,
        color: '#E879F9',
      },
      {
        min: 50,
        max: 100,
        color: '#89d6fb',
      },
    ],
  },
};

const tempSetup: LinearGaugeConfig = {
  type: 'linear-horizontal',
  sizes: {
    width: 550,
    outline: 0,
    outlineSpacer: 5,
    tick: 40,
    danger: 5,
    segmentDivider: 1,
    label: 24,
    subLabel: 45,
    value: 100,
    displaySpacer: 10,
    digits: 30,
    digitsSpacer: 15,
    slider: 25,
  },
  display: {
    segments: {
      sliding: false,
      count: 30,
      rounding: 2,
    },
    digits: {
      rounding: 30,
      roundDown: 1,
      overrides: {},
    },
    display: {
      labelOnRight: false,
      label: '&deg;C',
      subLabel: 'TEMP',
      roundingDown: 1,
    },
  },
  colors: {
    gaugeBackground: '#333333',
  },
  values: {
    min: 60,
    max: 120,
    ranges: [
      {
        min: 0,
        max: 90,
        color: '#89d6fb',
      },
      {
        min: 91,
        max: 92,
        color: '#E879F9',
      },
      {
        min: 93,
        max: 120,
        color: '#ff0000',
        danger: true,
      },
    ],
  },
};

const trimSetup: LinearGaugeConfig = {
  type: 'linear-horizontal',
  sizes: {
    width: 550,
    outline: 0,
    outlineSpacer: 5,
    tick: 40,
    danger: 2,
    segmentDivider: 1,
    label: 50,
    subLabel: 24,
    value: 0.0001,
    displaySpacer: 10,
    digits: 30,
    digitsSpacer: 15,
    slider: 25,
  },
  display: {
    segments: {
      sliding: true,
      count: 40,
      rounding: 2,
    },
    digits: {
      rounding: 1,
      roundDown: 1,
      overrides: {
        0: 'DOWN',
        100: 'UP',
      },
    },
    display: {
      label: 'trim',
      subLabel: 'position',
      roundingDown: 1,
    },
  },
  colors: {
    gaugeBackground: '#333333',
  },
  values: {
    min: 0,
    max: 100,
    ranges: [
      {
        min: 0,
        max: 2,
        color: '#89d6fb',
      },
      {
        min: 5,
        max: 95,
        color: '#E879F9',
      },
      {
        min: 98,
        max: 100,
        color: '#89d6fb',
      },
    ],
  },
};

const voltageSetup: LinearGaugeConfig = {
  type: 'linear-horizontal',
  sizes: {
    width: 250,
    outline: 0,
    outlineSpacer: 5,
    tick: 40,
    danger: 2,
    segmentDivider: 1,
    label: 15,
    subLabel: 30,
    value: 80,
    displaySpacer: 10,
    digits: 30,
    digitsSpacer: 15,
    slider: 50,
  },
  display: {
    segments: {
      sliding: false,
      count: 8,
      rounding: 1,
    },
    digits: {
      rounding: 2,
      roundDown: 1,
      overrides: {},
    },
    display: {
      labelOnRight: false,
      label: '',
      subLabel: 'VOLT',
      roundingDown: 1,
    },
  },
  colors: {
    gaugeBackground: '#333333',
  },
  values: {
    min: 10,
    max: 18,
    ranges: [
      {
        min: 10,
        max: 12,
        color: '#ff0000',
        danger: true,
      },
      {
        min: 12,
        max: 13,
        color: '#E879F9',
      },
      {
        min: 13,
        max: 15,
        color: '#89d6fb',
      },
      {
        min: 15,
        max: 16,
        color: '#E879F9',
      },
      {
        min: 16,
        max: 18,
        color: '#ff0000',
        danger: true,
      },
    ],
  },
};

const oilPressureSetup: LinearGaugeConfig = {
  type: 'linear-horizontal',
  sizes: {
    width: 250,
    outline: 0,
    outlineSpacer: 5,
    tick: 40,
    danger: 2,
    segmentDivider: 1,
    label: 15,
    subLabel: 30,
    value: 80,
    displaySpacer: 10,
    digits: 30,
    digitsSpacer: 15,
    slider: 50,
  },
  display: {
    segments: {
      sliding: false,
      count: 20,
      rounding: 5,
    },
    digits: {
      rounding: 20,
      roundDown: 1,
      overrides: {},
    },
    display: {
      labelOnRight: false,
      label: 'OIL',
      subLabel: 'PSI',
      roundingDown: 1,
    },
  },
  colors: {
    gaugeBackground: '#333333',
  },
  values: {
    min: 0,
    max: 100,
    ranges: [
      {
        min: 0,
        max: 20,
        color: '#ff0000',
        danger: true,
      },
      {
        min: 25,
        max: 30,
        color: '#E879F9',
      },
      {
        min: 40,
        max: 60,
        color: '#89d6fb',
      },
      {
        min: 70,
        max: 75,
        color: '#E879F9',
      },
      {
        min: 80,
        max: 100,
        color: '#ff0000',
        danger: true,
      },
    ],
  },
};
