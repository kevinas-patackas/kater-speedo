import {
  CircularGaugeConfig,
  GaugesConfig,
  LinearGaugeConfig,
  SocketTopic,
} from '@kater-speedo/types';

export function getDefaultAltConfig(): GaugesConfig {
  return {
    gauges: [
      {
        topic: SocketTopic.RPM,
        config: rpmSetup,
        position: {
          rotation: 0,
          x: -380 + 30,
          y: -55 - 20,
        },
      },
      {
        topic: SocketTopic.Temperature,
        config: tempSetup,
        position: {
          rotation: 0,
          x: -380 + 30,
          y: 255 - 20,
        },
      },
      {
        topic: SocketTopic.Speed,
        config: speedSetup,
        position: {
          rotation: 0,
          x: 380 - 30,
          y: -55 - 20,
        },
      },
      {
        topic: SocketTopic.Fuel,
        config: fuelSetup,
        position: {
          rotation: 0,
          x: -850,
          y: 53,
        },
      },
      {
        topic: SocketTopic.Trim,
        config: trimSetup,
        position: {
          rotation: 0,
          x: 850,
          y: 53,
        },
      },
      {
        topic: SocketTopic.OilPressure,
        config: oilPressureSetup,
        position: {
          rotation: 0,
          x: 380 - 30,
          y: 255 - 20,
        },
      },
      {
        topic: SocketTopic.Voltage,
        config: voltageSetup,
        position: {
          rotation: 0,
          x: 0,
          y: 230,
        },
      },
    ],
  };
}

const speedSetup: CircularGaugeConfig = {
  type: 'circular',
  sizes: {
    container: {
      base: 580,
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    display: {
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    digitsRing: 580,
    gauge: 464,
    danger: 15,
    outline: 8,
    outlineSpacer: 16,
    tick: 300,
    segmentDivider: 12,
    label: 30,
    value: 128,
    digits: 0,
  },
  display: {
    segments: {
      count: 50,
      rounding: 2,
    },
    digits: {
      rounding: 10,
      roundDown: 1,
    },
    display: {
      label: 'KM/H',
      subLabel: '&nbsp;',
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
        max: 40,
        color: '#89d6fb',
      },
      {
        min: 45,
        max: 46,
        color: '#E879F9',
      },
      {
        min: 70,
        max: 100,
        color: '#ff0000',
        danger: true,
      },
    ],
  },
};

const rpmSetup: CircularGaugeConfig = {
  type: 'circular',
  sizes: {
    container: {
      base: 580,
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    display: {
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    digitsRing: 580,
    gauge: 464,
    danger: 15,
    outline: 8,
    outlineSpacer: 16,
    tick: 300,
    segmentDivider: 8,
    label: 30,
    value: 128,
    digits: 0,
  },
  display: {
    segments: {
      count: 70,
      rounding: 100,
    },
    digits: {
      rounding: 1000,
      roundDown: 1000,
    },
    display: {
      label: 'RPM',
      subLabel: 'x100',
      roundingDown: 100,
    },
  },
  colors: {
    gaugeBackground: '#333333',
  },
  values: {
    min: 0,
    max: 7000,
    ranges: [
      {
        min: 0,
        max: 3500,
        color: '#7DD3FC',
      },
      {
        min: 4000,
        max: 4500,
        color: '#E879F9',
      },
      {
        min: 5000,
        max: 7000,
        color: '#ff0000',
        danger: true,
      },
    ],
  },
};

const fuelSetup: LinearGaugeConfig = {
  type: 'linear-vertical',
  sizes: {
    width: 400,
    outline: 4,
    outlineSpacer: 5,
    tick: 40,
    danger: 5,
    segmentDivider: 5,
    label: 35,
    subLabel: 20,
    value: 0,
    displaySpacer: 10,
    digits: 25,
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
        100: 'Full',
        0: 'Empty',
      },
    },
    display: {
      label: 'FUEL',
      subLabel: '',
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
        min: 35,
        max: 100,
        color: '#7DD3FC',
      },
    ],
  },
};

const tempSetup: CircularGaugeConfig = {
  type: 'half-circular',
  sizes: {
    container: {
      base: 320,
      padding: {
        top: 76,
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    display: {
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 80,
      },
    },
    digitsRing: 380,
    gauge: 380,
    danger: 18,
    outline: 8,
    outlineSpacer: 16,
    tick: 80,
    segmentDivider: 5,
    label: 30,
    value: 100,
    digits: 30,
  },
  display: {
    segments: {
      count: 30,
      rounding: 2,
    },
    digits: {
      rounding: 30,
      roundDown: 1,
    },
    display: {
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
        color: '#7DD3FC',
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
  type: 'linear-vertical',
  sizes: {
    width: 400,
    outline: 4,
    outlineSpacer: 5,
    tick: 40,
    danger: 10,
    segmentDivider: 2,
    label: 35,
    subLabel: 20,
    value: 0,
    displaySpacer: 10,
    digits: 25,
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
      label: 'TRIM',
      subLabel: ' ',
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
        color: '#7DD3FC',
      },
      {
        min: 5,
        max: 95,
        color: '#E879F9',
      },
      {
        min: 98,
        max: 100,
        color: '#7DD3FC',
      },
    ],
  },
};

const voltageSetup: CircularGaugeConfig = {
  type: 'circular',
  sizes: {
    container: {
      base: 300,
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    display: {
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    digitsRing: 270,
    gauge: 200,
    danger: 15,
    outline: 8,
    outlineSpacer: 16,
    tick: 100,
    segmentDivider: 8,
    label: 18,
    value: 55,
    digits: 0,
  },
  display: {
    segments: {
      count: 32,
      rounding: 1,
    },
    digits: {
      hidden: true,
      rounding: 1,
      roundDown: 1,
    },
    display: {
      label: '&nbsp;',
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
        color: '#7DD3FC',
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

const oilPressureSetup: CircularGaugeConfig = {
  type: 'half-circular',
  sizes: {
    container: {
      base: 320,
      padding: {
        top: 76,
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    display: {
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 80,
      },
    },
    digitsRing: 380,
    gauge: 380,
    danger: 18,
    outline: 8,
    outlineSpacer: 16,
    tick: 80,
    segmentDivider: 9,
    label: 30,
    value: 100,
    digits: 30,
  },
  display: {
    segments: {
      count: 20,
      rounding: 5,
    },
    digits: {
      rounding: 20,
      roundDown: 1,
    },
    display: {
      label: 'PSI',
      subLabel: 'OIL',
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
        color: '#7DD3FC',
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
