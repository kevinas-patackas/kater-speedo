import { SocketTopic } from '@kater-speedo/types';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { getColorClass } from '../../utils/color-class-calc';
import { GaugeTick } from './tick';

export function TempGauge({ socket }: { socket: Socket | null }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (socket) {
      socket.on(SocketTopic.Temperature, (data: number) => {
        setValue(data);
      });
    }
  }, [socket]);

  const colorClass = () => {
    if (value < 85) {
      return getColorClass({
        current: value,
        min: 50,
        max: 85,
        inverse: true,
      });
    }
    if (value > 92) {
      return getColorClass({
        current: value,
        min: 92,
        max: 98,
      });
    }
    return undefined;
  };

  return (
    <div className="h-36 w-72 relative">
      {tempSetup.map((i) => (
        <GaugeTick
          key={i.value}
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 ${i.className}`}
          value={i.showValue ? i.value.toString() : ''}
          active={value >= i.value}
          thick={i.showValue}
          long={i.showValue}
          customColorClass={colorClass()}
        />
      ))}
      <div
        className={`absolute top-16 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center w-44`}
      >
        <div className="w-full text-3xl text-center font-digital-bold -mb-1 text-white">
          &deg;C
        </div>
        <div className="w-full text-7xl text-center font-digital-bold text-white">
          {value}
        </div>
        {value > 96 ? (
          <div className="flex flex-wrap w-32 h-8 bg-speedo-23 rounded text-white text-2xl font-digital-bold justify-center items-center">
            <div>HOT</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const tempSetup = [
  {
    showValue: true,
    value: 60,
    className: '-rotate-48',
  },
  {
    showValue: false,
    value: 65,
    className: '-rotate-40',
  },
  {
    showValue: true,
    value: 70,
    className: '-rotate-32',
  },
  {
    showValue: false,
    value: 75,
    className: '-rotate-24',
  },
  {
    showValue: true,
    value: 80,
    className: '-rotate-16',
  },
  {
    showValue: false,
    value: 85,
    className: '-rotate-8',
  },
  {
    showValue: true,
    value: 90,
    className: 'rotate-0',
  },
  {
    showValue: false,
    value: 95,
    className: 'rotate-8',
    colorClass: 'bg-lime-400',
  },
  {
    showValue: true,
    value: 100,
    className: 'rotate-16',
    colorClass: 'bg-yellow-200',
  },
  {
    showValue: false,
    value: 105,
    className: 'rotate-24',
    colorClass: 'bg-yellow-300',
  },
  {
    showValue: true,
    value: 110,
    className: 'rotate-32',
    colorClass: 'bg-amber-300',
  },
  {
    showValue: false,
    value: 115,
    className: 'rotate-40',
    colorClass: 'bg-amber-500',
  },
  {
    showValue: true,
    value: 120,
    className: 'rotate-48',
    colorClass: 'bg-red-500',
  },
];
