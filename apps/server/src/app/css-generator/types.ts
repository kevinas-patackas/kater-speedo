export interface CircularGaugeClassDefinition {
  type: 'circular';
  sizes: {
    container: number;
    gauge: number;
    danger: number;
    outline: number;
    outlineSpacer: number;
    tick: number;
    segmentDivider: number;
    label: number;
    value: number;
  };
  segments: number;
  values: {
    min: number;
    max: number;
    good: {
      min: number;
      max: number;
    };
    warning: {
      min: number;
      max: number;
    };
    error: {
      min: number;
      max: number;
    };
  };
}

export interface CssClassObject {
  name: string;
  styles: Record<string, string>;
}
