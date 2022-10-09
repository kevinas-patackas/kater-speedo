import { SocketTopic } from '@kater-speedo/types';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { GaugeTick } from './tick';

export function SpeedGauge({ socket }: { socket: Socket | null }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (socket) {
      socket.on(SocketTopic.Speed, (data: number) => {
        setValue(data);
      });
    }
  }, [socket]);

  return (
    <div className="h-128 w-128 relative">
      {speedSetup.map((i) => (
        <GaugeTick
          big
          key={i.value}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${i.className}`}
          value={i.showValue ? i.value.toString() : ''}
          active={value >= i.value}
          thick
          long={i.showValue}
          customColorClass={i.colorClass}
        />
      ))}
      {/* <Arrow
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-50`}
      /> */}
      <div
        className={`absolute -mt-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-wrap justify-center`}
      >
        <div className="w-full text-center text-3xl font-digital-bold -mb-1 text-white">
          KM/H
        </div>
        <div className="w-full text-8xl text-center font-digital-bold text-white">
          {value}
        </div>
      </div>
    </div>
  );
}

const speedSetup = [
  {
    showValue: true,
    value: 0,
    className: '-rotate-125',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 2,
    className: '-rotate-120',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 4,
    className: '-rotate-115',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 6,
    className: '-rotate-110',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 8,
    className: '-rotate-105',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: true,
    value: 10,
    className: '-rotate-100',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 12,
    className: '-rotate-95',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 14,
    className: '-rotate-90',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 16,
    className: '-rotate-85',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 18,
    className: '-rotate-80',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: true,
    value: 20,
    className: '-rotate-75',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 22,
    className: '-rotate-70',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 24,
    className: '-rotate-65',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 26,
    className: '-rotate-60',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 28,
    className: '-rotate-55',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: true,
    value: 30,
    className: '-rotate-50',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 32,
    className: '-rotate-45',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 34,
    className: '-rotate-40',
    colorClass: 'bg-speedo-2',
  },
  {
    showValue: false,
    value: 36,
    className: '-rotate-35',
    colorClass: 'bg-speedo-3',
  },
  {
    showValue: false,
    value: 38,
    className: '-rotate-30',
    colorClass: 'bg-speedo-4',
  },
  {
    showValue: true,
    value: 40,
    className: '-rotate-25',
    colorClass: 'bg-speedo-5',
  },
  {
    showValue: false,
    value: 42,
    className: '-rotate-20',
    colorClass: 'bg-speedo-6',
  },
  {
    showValue: false,
    value: 44,
    className: '-rotate-15',
    colorClass: 'bg-speedo-6',
  },
  {
    showValue: false,
    value: 46,
    className: '-rotate-10',
    colorClass: 'bg-speedo-7',
  },
  {
    showValue: false,
    value: 48,
    className: '-rotate-5',
    colorClass: 'bg-speedo-8',
  },
  {
    showValue: true,
    value: 50,
    className: 'rotate-0',
    colorClass: 'bg-speedo-9',
  },
  {
    showValue: false,
    value: 52,
    className: 'rotate-5',
    colorClass: 'bg-speedo-10',
  },
  {
    showValue: false,
    value: 54,
    className: 'rotate-10',
    colorClass: 'bg-speedo-11',
  },
  {
    showValue: false,
    value: 56,
    className: 'rotate-15',
    colorClass: 'bg-speedo-12',
  },
  {
    showValue: false,
    value: 58,
    className: 'rotate-20',
    colorClass: 'bg-speedo-13',
  },
  {
    showValue: true,
    value: 60,
    className: 'rotate-25',
    colorClass: 'bg-speedo-14',
  },
  {
    showValue: false,
    value: 62,
    className: 'rotate-30',
    colorClass: 'bg-speedo-15',
  },
  {
    showValue: false,
    value: 64,
    className: 'rotate-35',
    colorClass: 'bg-speedo-16',
  },
  {
    showValue: false,
    value: 66,
    className: 'rotate-40',
    colorClass: 'bg-speedo-17',
  },
  {
    showValue: false,
    value: 68,
    className: 'rotate-45',
    colorClass: 'bg-speedo-17',
  },
  {
    showValue: true,
    value: 70,
    className: 'rotate-50',
    colorClass: 'bg-speedo-18',
  },
  {
    showValue: false,
    value: 72,
    className: 'rotate-55',
    colorClass: 'bg-speedo-19',
  },
  {
    showValue: false,
    value: 74,
    className: 'rotate-60',
    colorClass: 'bg-speedo-20',
  },
  {
    showValue: false,
    value: 76,
    className: 'rotate-65',
    colorClass: 'bg-speedo-21',
  },
  {
    showValue: false,
    value: 78,
    className: 'rotate-70',
    colorClass: 'bg-speedo-22',
  },
  {
    showValue: true,
    value: 80,
    className: 'rotate-75',
    colorClass: 'bg-speedo-23',
  },
  {
    showValue: false,
    value: 82,
    className: 'rotate-80',
    colorClass: 'bg-speedo-23',
  },
  {
    showValue: false,
    value: 84,
    className: 'rotate-85',
    colorClass: 'bg-speedo-23',
  },
  {
    showValue: false,
    value: 86,
    className: 'rotate-90',
    colorClass: 'bg-speedo-23',
  },
  {
    showValue: false,
    value: 88,
    className: 'rotate-95',
    colorClass: 'bg-speedo-23',
  },
  {
    showValue: true,
    value: 90,
    className: 'rotate-100',
    colorClass: 'bg-speedo-23',
  },
  {
    showValue: false,
    value: 92,
    className: 'rotate-105',
    colorClass: 'bg-speedo-23',
  },
  {
    showValue: false,
    value: 94,
    className: 'rotate-110',
    colorClass: 'bg-speedo-23',
  },
  {
    showValue: false,
    value: 96,
    className: 'rotate-115',
    colorClass: 'bg-speedo-23',
  },
  {
    showValue: false,
    value: 98,
    className: 'rotate-120',
    colorClass: 'bg-speedo-23',
  },
  {
    showValue: true,
    value: 100,
    className: 'rotate-125',
    colorClass: 'bg-speedo-23',
  },
];
