import { SocketTopic } from '@kater-speedo/types';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

// {
//   socket,
//   topic,
// }: {
//   socket: Socket;
//   topic: SocketTopic;
// }

export function CircularGauge({
  socket,
  topic,
}: {
  socket: Socket | null;
  topic: SocketTopic;
}) {
  console.log('circular gauge');
  return (
    <div className="circular-speed-container">
      <div className="circular-speed-ring-danger"></div>
      <div className="circular-speed-ring-outer"></div>
      <div className="circular-speed-ring-outer-spacer"></div>
      <div className="circular-speed-gauge-background"></div>
      <Gauge socket={socket} topic={topic} />
      <Dividers />
      <div className="circular-speed-ring-inner"></div>
      <Display socket={socket} topic={topic} />
    </div>
  );
}

function Gauge({
  socket,
  topic,
}: {
  socket: Socket | null;
  topic: SocketTopic;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (socket) {
      socket.on(topic, (data: number) => {
        // eslint-disable-next-line no-eval
        if (!eval(`${data} % 1`)) {
          setValue(data);
        }
      });
    }
  }, [socket, topic]);

  const valueClass =
    value < 0
      ? `circular-speed-gauge-value-min`
      : value > 100
      ? `circular-speed-gauge-value-max`
      : `circular-speed-gauge-value-${value}`;

  console.log('GaugeLogic', value);

  return <div className={`circular-speed-gauge-value-base ${valueClass}`} />;
}

function Display({
  socket,
  topic,
}: {
  socket: Socket | null;
  topic: SocketTopic;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (socket) {
      socket.on(topic, (data: number) => {
        setValue(data);
      });
    }
  }, [socket, topic]);

  console.log('Display', value);

  return (
    <div className="circular-speed-display-container">
      <div className="circular-speed-display-text-base circular-speed-display-text-label">
        KM/H
      </div>
      <div className="circular-speed-display-text-base circular-speed-display-text-value">
        {value}
      </div>
      <div className="circular-speed-display-text-base circular-speed-display-text-label">
        &nbsp;&nbsp;
      </div>
    </div>
  );
}

function Dividers() {
  const COMES_FROM_SETUP = 100;
  const [indexes, setIndexes] = useState<number[]>([]);

  useEffect(() => {
    const result = [];
    for (let i = 0; i < COMES_FROM_SETUP + 2; i++) {
      result.push(i);
    }
    setIndexes(result);
  }, []);

  return (
    <>
      {indexes.map((i) => (
        <div
          key={i}
          className={`circular-speed-segment-divider-base circular-speed-segment-divider-rotate-${i}`}
        >
          <div className="circular-speed-segment-divider-color"></div>
        </div>
      ))}
    </>
  );
}
