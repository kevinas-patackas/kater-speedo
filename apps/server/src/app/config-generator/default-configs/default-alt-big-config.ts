import {
  CircularGaugeConfig,
  GaugesConfig,
  LinearGaugeConfig,
  SocketTopic,
} from '@kater-speedo/types';

export function getDefaultAltBigConfig(): GaugesConfig {
  return {
    gauges: [
      {
        topic: SocketTopic.RPM,
        config: rpmSetup,
        position: {
          rotation: 0,
          x: -380 + 30 - 70,
          y: -55 - 20 + 43,
        },
      },
      {
        topic: SocketTopic.Temperature,
        config: tempSetup,
        position: {
          rotation: 0,
          x: -380 + 30 - 70,
          y: 255 - 20 + 138,
        },
      },
      {
        topic: SocketTopic.Speed,
        config: speedSetup,
        position: {
          rotation: 0,
          x: 380 - 30 + 70,
          y: -55 - 20 + 43,
        },
      },
      {
        topic: SocketTopic.Fuel,
        config: fuelSetup,
        position: {
          rotation: 0,
          x: -900,
          y: 53 + 50,
        },
      },
      {
        topic: SocketTopic.Trim,
        config: trimSetup,
        position: {
          rotation: 0,
          x: 900,
          y: 53 + 50,
        },
      },
      {
        topic: SocketTopic.OilPressure,
        config: oilPressureSetup,
        position: {
          rotation: 0,
          x: 380 - 30 + 70,
          y: 255 - 20 + 138,
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
      base: 740,
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
        bottom: 25,
      },
    },
    digitsRing: 740,
    gauge: 624,
    danger: 15,
    outline: 8,
    outlineSpacer: 16,
    tick: 300,
    segmentDivider: 11,
    label: 35,
    value: 180,
    digits: 0,
  },
  display: {
    segments: {
      count: 70,
      rounding: 1,
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
    max: 70,
    ranges: [
      {
        min: 0,
        max: 35,
        color: '#89d6fb',
      },
      {
        min: 40,
        max: 46,
        color: '#E879F9',
      },
      {
        min: 50,
        max: 70,
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
      base: 740,
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
        bottom: 25,
      },
    },
    digitsRing: 740,
    gauge: 624,
    danger: 15,
    outline: 8,
    outlineSpacer: 16,
    tick: 300,
    segmentDivider: 11,
    label: 35,
    value: 180,
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
    width: 450,
    outline: 4,
    outlineSpacer: 5,
    tick: 45,
    danger: 5,
    segmentDivider: 5,
    label: 25,
    subLabel: 0,
    value: 0,
    displaySpacer: 0,
    digits: 0,
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
      label: '&nbsp;FUEL&nbsp;',
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
      base: 520,
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
        bottom: 230,
      },
    },
    digitsRing: 580,
    gauge: 580,
    danger: 14,
    outline: 6,
    outlineSpacer: 16,
    tick: 100,
    segmentDivider: 4,
    label: 30,
    value: 120,
    digits: 30,
  },
  display: {
    segments: {
      count: 60,
      rounding: 1,
    },
    digits: {
      rounding: 30,
      roundDown: 1,
    },
    display: {
      label: 'TEMP&deg;C',
      subLabel: '',
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
        min: 92,
        max: 93,
        color: '#E879F9',
      },
      {
        min: 94,
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
    width: 450,
    outline: 4,
    outlineSpacer: 5,
    tick: 45,
    danger: 10,
    segmentDivider: 2,
    label: 25,
    subLabel: 0,
    value: 0,
    displaySpacer: 0,
    digits: 0,
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
      label: '&nbsp;TRIM&nbsp;',
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
      base: 330,
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
        bottom: 20,
      },
    },
    digitsRing: 300,
    gauge: 230,
    danger: 12,
    outline: 6,
    outlineSpacer: 16,
    tick: 100,
    segmentDivider: 8,
    label: 25,
    value: 65,
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
      base: 520,
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
        bottom: 230,
      },
    },
    digitsRing: 580,
    gauge: 580,
    danger: 14,
    outline: 6,
    outlineSpacer: 16,
    tick: 100,
    segmentDivider: 5,
    label: 30,
    value: 120,
    digits: 30,
  },
  display: {
    segments: {
      count: 50,
      rounding: 2,
    },
    digits: {
      rounding: 20,
      roundDown: 1,
    },
    display: {
      label: 'OIL PSI',
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
