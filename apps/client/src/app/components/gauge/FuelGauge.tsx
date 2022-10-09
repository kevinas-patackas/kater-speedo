import { SocketTopic } from '@kater-speedo/types';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { getColorClass } from '../../utils/color-class-calc';
import { GaugeTick } from './tick';

export function FuelGauge({ socket }: { socket: Socket | null }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (socket) {
      socket.on(SocketTopic.Fuel, (data: number) => {
        setValue(data);
      });
    }
  }, [socket]);

  return (
    <div className="h-36 w-72 relative">
      {fuelSetup.map((i) => (
        <GaugeTick
          key={i.value}
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 ${i.className}`}
          value={i.label ?? ''}
          active={value >= i.value}
          thick
          long={i.showValue}
          customColorClass={getColorClass({
            current: value,
            min: 10,
            max: 50,
            inverse: true,
          })}
        />
      ))}
      <div
        className={`absolute top-16 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center w-44`}
      >
        <div className="w-full text-3xl text-center font-digital-bold -mb-1 text-white">
          %
        </div>
        <div className="w-full text-7xl text-center font-digital-bold text-white">
          {value}
        </div>
        {value < 20 ? (
          <div className="flex flex-wrap w-32 h-8 bg-speedo-23 rounded text-white text-2xl font-digital-bold justify-center items-center">
            <div>LOW</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const fuelSetup = [
  {
    showValue: true,
    value: 0,
    label: 'E',
    className: '-rotate-48',
  },
  {
    showValue: false,
    value: 10,
    className: '-rotate-36',
  },
  {
    showValue: true,
    value: 20,
    label: '1/4',
    className: '-rotate-24',
  },
  {
    showValue: false,
    value: 30,
    className: '-rotate-12',
  },
  {
    showValue: true,
    value: 40,
    label: '2/4',
    className: 'rotate-0',
  },
  {
    showValue: false,
    value: 50,
    className: 'rotate-12',
  },
  {
    showValue: true,
    value: 60,
    label: '3/4',
    className: 'rotate-24',
  },
  {
    showValue: false,
    value: 70,
    className: 'rotate-36',
  },
  {
    showValue: true,
    value: 80,
    label: 'F',
    className: 'rotate-48',
  },
];
