import { SocketTopic } from '@kater-speedo/types';
import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

export function TrimIndicator({ socket }: { socket: Socket | null }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (socket) {
      socket.on(SocketTopic.Trim, (data: number) => {
        setValue(data);
      });
    }
  }, [socket]);

  const { current, semi } = getActiveSemiActiveIndexes(value);

  return (
    <div className="flex flex-wrap flex-col h-128 w-32 items-center justify-center text-white">
      <div className="font-digital-bold w-full text-lg text-center -mb-1 text-white">
        TRIM
      </div>

      <div className="font-digital-bold w-full text-4xl text-center text-white mb-2">
        {roundNearest5(value) === 100
          ? 'UP'
          : roundNearest5(value) === 0
          ? 'DOWN'
          : 'MID'}
      </div>
      {legSetup.map((indicatorValue, index) => (
        <TrimTick
          key={index}
          state={
            index === current
              ? 'active'
              : semi.includes(index)
              ? 'semi'
              : undefined
          }
        />
      ))}
    </div>
  );
}

const TrimTick: React.FC<{ state?: 'semi' | 'active' }> = ({ state }) => {
  return (
    <div className="h-4 w-18 flex flex-col justify-center">
      {state === 'active' ? (
        <div className="rounded h-3.5 w-24 bg-speedo-1"></div>
      ) : state === 'semi' ? (
        <div className="rounded h-3 w-14 bg-lime-700"></div>
      ) : (
        <div className="rounded h-2.5 w-10 bg-slate-700"></div>
      )}
    </div>
  );
};

function roundNearest5(num: number) {
  return Math.round(num / 5) * 5;
}

const getActiveSemiActiveIndexes = (value: number) => {
  const current = legSetup.indexOf(roundNearest5(value));

  return {
    current,
    semi: [current - 1, current + 1],
    light: [current - 2, current + 2],
  };
};

const legSetup = [
  100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10,
  5, 0,
];
