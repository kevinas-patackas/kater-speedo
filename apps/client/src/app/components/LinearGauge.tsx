import { LinearGaugeConfig, SocketTopic } from '@kater-speedo/types';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

export function LinearGauge({
  socket,
  topic,
  config,
}: {
  socket: Socket | null;
  topic: SocketTopic;
  config: LinearGaugeConfig;
}) {
  return (
    <div className={`${config.type}-${topic}-master-container`}>
      <Display socket={socket} topic={topic} config={config} />
      {config.type === 'linear-vertical' && !config.display.digits.hidden ? (
        <div className={`${config.type}-${topic}-digits-container`}>
          <div className={`${config.type}-${topic}-digit`}>
            {config.display.digits.overrides[config.values.max] ??
              config.values.max}
          </div>
        </div>
      ) : undefined}
      <div className={`${config.type}-${topic}-container`}>
        <div className={`${config.type}-${topic}-danger`} />
        <div className={`${config.type}-${topic}-outline-top`} />
        <div className={`${config.type}-${topic}-gauge-container`}>
          <div
            className={`${config.type}-${topic}-gauge-container-background`}
          />
          {!config.display.segments.sliding ? (
            <Gauge socket={socket} topic={topic} config={config} />
          ) : undefined}
          <Dividers topic={topic} config={config} />
          {config.display.segments.sliding ? (
            <Gauge socket={socket} topic={topic} config={config} />
          ) : undefined}
        </div>
        <div className={`${config.type}-${topic}-outline-bottom`} />
        {config.type === 'linear-horizontal' &&
        !config.display.digits.hidden ? (
          <div className={`${config.type}-${topic}-digits-container`}>
            <div className={`${config.type}-${topic}-digit`}>
              {config.display.digits.overrides[config.values.min] ??
                config.values.min}
            </div>
            <div className={`${config.type}-${topic}-digit`}>
              {config.display.digits.overrides[config.values.max] ??
                config.values.max}
            </div>
          </div>
        ) : undefined}
        {config.type === 'linear-vertical' ? (
          <div className={`${config.type}-${topic}-danger`} />
        ) : undefined}
      </div>
      {config.type === 'linear-vertical' && !config.display.digits.hidden ? (
        <div className={`${config.type}-${topic}-digits-container`}>
          <div className={`${config.type}-${topic}-digit`}>
            {config.display.digits.overrides[config.values.min] ??
              config.values.min}
          </div>
        </div>
      ) : undefined}
    </div>
  );
}

function Display({
  socket,
  topic,
  config,
}: {
  socket: Socket | null;
  topic: SocketTopic;
  config: LinearGaugeConfig;
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
      {config.sizes.value > 0 ? (
        <div className={`${config.type}-${topic}-display-value`}>
          {Number(value / config.display.display.roundingDown).toFixed(0)}
        </div>
      ) : undefined}
      <div className={`${config.type}-${topic}-display-labels-container`}>
        {config.sizes.label > 0 ? (
          <div
            className={`${config.type}-${topic}-display-label`}
            dangerouslySetInnerHTML={{ __html: config.display.display.label }}
          />
        ) : undefined}
        {config.sizes.subLabel > 0 ? (
          <div
            className={`${config.type}-${topic}-display-sub-label`}
            dangerouslySetInnerHTML={{
              __html: config.display.display.subLabel,
            }}
          />
        ) : undefined}
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
  config: LinearGaugeConfig;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (socket) {
      const { rounding } = config.display.segments;

      socket.on(topic, (data: number) => {
        setValue(Math.round(data / rounding) * rounding);
        // setValue(70);
      });
    }
  }, [config, socket, topic]);

  const getValueClass = () => {
    if (value < config.values.min) {
      return `${config.type}-${topic}-gauge-value-min`;
    }

    if (value > config.values.max) {
      return `${config.type}-${topic}-gauge-value-max`;
    }

    return `${config.type}-${topic}-gauge-value-${value}`;
  };

  return (
    <div
      className={`${config.type}-${topic}-gauge-value-base ${getValueClass()}`}
    />
  );
}

function Dividers({
  config,
  topic,
}: {
  topic: SocketTopic;
  config: LinearGaugeConfig;
}) {
  const [starts, setStarts] = useState<number[]>([]);

  useEffect(() => {
    const result = [];
    for (let i = 0; i < config.display.segments.count; i++) {
      result.push(i);
    }
    setStarts(result);
  }, [config]);

  return (
    <div className={`${config.type}-${topic}-dividers-container`}>
      {starts.map((i) => (
        <div key={i} className={`${config.type}-${topic}-divider`}></div>
      ))}
    </div>
  );
}
