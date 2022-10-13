import EventEmitter = require('events');

export class NoiseReducer {
  private readonly sampleCount: number;
  private reducedValue: number;
  private reducerArray: number[] = [];
  private eventEmitter: EventEmitter;

  constructor({
    initialValue,
    sampleCount,
  }: {
    initialValue: number;
    sampleCount: number;
  }) {
    this.reducedValue = initialValue;
    this.sampleCount = sampleCount;
    this.reducerArray.unshift(initialValue);
    this.eventEmitter = new EventEmitter();
  }

  public get events() {
    return this.eventEmitter;
  }

  public get value() {
    return this.reducedValue;
  }

  public next(value: number) {
    this.reducerArray.unshift(value);

    if (this.reducerArray.length > this.sampleCount) {
      this.reducerArray.pop();
    }

    this.findReducedValue();
  }

  private findReducedValue() {
    const average =
      this.reducerArray.reduce((acc, current) => acc + current, 0) /
      this.reducerArray.length;
    const midValue = [...this.reducerArray].sort()[
      Math.round(this.reducerArray.length / 2)
    ];
    const result = Math.round((average + midValue) / 2);

    if (this.reducedValue !== result) {
      this.reducedValue = result;
      this.eventEmitter.emit('changed', this.reducedValue);
    }
  }
}
