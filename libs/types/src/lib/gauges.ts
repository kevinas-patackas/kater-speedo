import { SocketTopic } from './types';

export interface GaugesConfig {
  gauges: {
    topic: SocketTopic;
    config: CircularGaugeConfig | LinearGaugeConfig;
    position: {
      x: number;
      y: number;
      rotation: number;
    };
  }[];
}

export interface CircularGaugeConfig {
  type: 'circular' | 'half-circular';
  sizes: {
    container: {
      base: number;
      padding: {
        top: number;
        bottom: number;
        left: number;
        right: number;
      };
    };
    display: {
      padding: {
        top: number;
        bottom: number;
        left: number;
        right: number;
      };
    };
    digitsRing: number;
    gauge: number;
    danger: number;
    outline: number;
    outlineSpacer: number;
    tick: number;
    segmentDivider: number;
    label: number;
    value: number;
    digits: number;
  };
  display: {
    segments: {
      hidden?: boolean;
      count: number;
      rounding: number;
    };
    digits: {
      hidden?: boolean;
      rounding: number;
      roundDown: number;
    };
    display: {
      label: string;
      subLabel: string;
      roundingDown: number;
    };
    dangerOnGood?: boolean;
  };
  colors: {
    gaugeBackground: string;
  };
  values: {
    min: number;
    max: number;
    ranges: {
      min: number;
      max: number;
      color: string;
      danger?: boolean;
    }[];
  };
}

export interface LinearGaugeConfig {
  type: 'linear-horizontal' | 'linear-vertical';
  sizes: {
    width: number;
    outline: number;
    outlineSpacer: number;
    tick: number;
    danger: number;
    segmentDivider: number;
    label: number;
    subLabel: number;
    value: number;
    displaySpacer: number;
    digits: number;
    digitsSpacer: number;
    slider: number;
  };
  display: {
    segments: {
      sliding: boolean;
      hidden?: boolean;
      count: number;
      rounding: number;
    };
    digits: {
      hidden?: boolean;
      rounding: number;
      roundDown: number;
      overrides: Record<string | number, string | number>;
    };
    display: {
      labelOnRight?: boolean;
      label: string;
      subLabel: string;
      roundingDown: number;
    };
  };
  colors: {
    gaugeBackground: string;
  };
  values: {
    min: number;
    max: number;
    ranges: {
      min: number;
      max: number;
      color: string;
      danger?: boolean;
    }[];
  };
}
