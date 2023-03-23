import { CircularGaugeConfig, SocketTopic } from '@kater-speedo/types';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

export function CircularGauge({
  socket,
  topic,
  config,
}: {
  socket: Socket | null;
  topic: SocketTopic;
  config: CircularGaugeConfig;
}) {
  return (
    <div className={`${config.type}-${topic}-container`}>
      <div className={`${config.type}-${topic}-sub-container`}>
        <div className={`${config.type}-${topic}-ring-danger`} />
        <div className={`${config.type}-${topic}-ring-outer`} />
        <Digits topic={topic} config={config} />
        <div className={`${config.type}-${topic}-ring-outer-spacer`} />
        <div className={`${config.type}-${topic}-gauge-background`} />
        <Gauge socket={socket} topic={topic} config={config} />
        <Dividers topic={topic} config={config} />
        <div className={`${config.type}-${topic}-ring-inner`} />
        <Display socket={socket} topic={topic} config={config} />
      </div>
    </div>
  );
}

function Gauge({
  socket,
  topic,
  config,
}: {
  socket: Socket | null;
  topic: SocketTopic;
  config: CircularGaugeConfig;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (socket) {
      const rounding = config.display.segments.rounding;
      socket.on(topic, (data: number) => {
        setValue(Math.round(data / rounding) * rounding);
      });
    }
  }, [socket, topic, config]);

  const valueClass =
    value < config.values.min
      ? `${config.type}-${topic}-gauge-value-min`
      : value > config.values.max
      ? `${config.type}-${topic}-gauge-value-max`
      : `${config.type}-${topic}-gauge-value-${value}`;

  return (
    <div className={`${config.type}-${topic}-gauge-value-base ${valueClass}`} />
  );
}

function Display({
  socket,
  topic,
  config,
}: {
  socket: Socket | null;
  topic: SocketTopic;
  config: CircularGaugeConfig;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (socket) {
      socket.on(topic, (data: number) => {
        setValue(data);
      });
    }
  }, [socket, topic]);

  return (
    <div className={`${config.type}-${topic}-display-container`}>
      <div
        className={`${config.type}-${topic}-display-text-base ${config.type}-${topic}-display-text-label`}
        dangerouslySetInnerHTML={{ __html: config.display.display.label }}
      ></div>
      <div
        className={`${config.type}-${topic}-display-text-base ${config.type}-${topic}-display-text-value`}
      >
        {Number(value / config.display.display.roundingDown).toFixed(0)}
      </div>
      <div
        className={`${config.type}-${topic}-display-text-base ${config.type}-${topic}-display-text-label`}
        dangerouslySetInnerHTML={{
          __html: `&nbsp;${config.display.display.subLabel}&nbsp;`,
        }}
      ></div>
    </div>
  );
}

function Dividers({
  topic,
  config,
}: {
  topic: SocketTopic;
  config: CircularGaugeConfig;
}) {
  const [indexes, setIndexes] = useState<number[]>([]);

  useEffect(() => {
    const result = [];
    for (let i = 0; i < config.display.segments.count + 2; i++) {
      result.push(i);
    }
    setIndexes(result);
  }, [config]);

  return (
    <>
      {indexes.map((i) => (
        <div
          key={i}
          className={`${config.type}-${topic}-segment-divider-base ${config.type}-${topic}-segment-divider-rotate-${i}`}
        >
          <div className={`${config.type}-${topic}-segment-divider-color`} />
        </div>
      ))}
    </>
  );
}

function Digits({
  topic,
  config,
}: {
  topic: SocketTopic;
  config: CircularGaugeConfig;
}) {
  const min = config.values.min;
  const max = config.values.max;
  const rounding = config.display.digits.rounding;

  const [roundedValues, setRoundedValues] = useState<number[]>([]);

  useEffect(() => {
    const digits = new Set<number>();
    for (let i = min; i <= max; i++) {
      const roundedValue = Math.round(i / rounding) * rounding;
      digits.add(roundedValue);
    }

    setRoundedValues(Array.from(digits));
  }, []);

  return (
    <>
      {roundedValues.map((value, i) => (
        <div
          key={i}
          className={`${config.type}-${topic}-digits-base ${config.type}-${topic}-digits-${value}`}
        >
          <div>{value / config.display.digits.roundDown}</div>
        </div>
      ))}
    </>
  );
}
