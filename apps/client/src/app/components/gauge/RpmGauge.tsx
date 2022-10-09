import { SocketTopic } from '@kater-speedo/types';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { GaugeTick } from './tick';

export function RpmGauge({ socket }: { socket: Socket | null }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (socket) {
      socket.on(SocketTopic.RPM, (data: number) => {
        setValue(data);
      });
    }
  }, [socket]);

  return (
    <div className="h-128 w-128 relative">
      {rpmSetup.map((i) => (
        <GaugeTick
          big
          key={i.value}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${i.className}`}
          value={i.showValue ? (i.value / 1000).toString() : ''}
          active={value >= i.value}
          thick
          long={i.showValue}
          customColorClass={i.colorClass}
        />
      ))}
      <div
        className={`absolute -mt-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-wrap justify-center`}
      >
        <div className="w-full text-center text-3xl font-digital-bold -mb-1 text-white">
          RPM
        </div>
        <div className="w-full text-8xl text-center font-digital-bold text-white">
          {value}
        </div>
      </div>
    </div>
  );
}

const rpmSetup = [
  {
    showValue: true,
    value: 0,
    className: '-rotate-125',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 100,
    className: '-rotate-120',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 200,
    className: '-rotate-115',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 300,
    className: '-rotate-110',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 400,
    className: '-rotate-105',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 500,
    className: '-rotate-100',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 600,
    className: '-rotate-95',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 700,
    className: '-rotate-90',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 800,
    className: '-rotate-85',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 900,
    className: '-rotate-80',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: true,
    value: 1000,
    className: '-rotate-75',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 1100,
    className: '-rotate-70',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 1200,
    className: '-rotate-65',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 1300,
    className: '-rotate-60',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 1400,
    className: '-rotate-55',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 1500,
    className: '-rotate-50',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 1600,
    className: '-rotate-45',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 1700,
    className: '-rotate-40',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 1800,
    className: '-rotate-35',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 1900,
    className: '-rotate-30',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: true,
    value: 2000,
    className: '-rotate-25',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 2100,
    className: '-rotate-20',
    colorClass: 'bg-speedo-1',
  },
  {
    showValue: false,
    value: 2200,
    className: '-rotate-15',
    colorClass: 'bg-speedo-2',
  },
  {
    showValue: false,
    value: 2300,
    className: '-rotate-10',
    colorClass: 'bg-speedo-3',
  },
  {
    showValue: false,
    value: 2400,
    className: '-rotate-5',
    colorClass: 'bg-speedo-5',
  },
  {
    showValue: false,
    value: 2500,
    className: 'rotate-0',
    colorClass: 'bg-speedo-6',
  },
  {
    showValue: false,
    value: 2600,
    className: 'rotate-5',
    colorClass: 'bg-speedo-7',
  },
  {
    showValue: false,
    value: 2700,
    className: 'rotate-10',
    colorClass: 'bg-speedo-8',
  },
  {
    showValue: false,
    value: 2800,
    className: 'rotate-15',
    colorClass: 'bg-speedo-9',
  },
  {
    showValue: false,
    value: 2900,
    className: 'rotate-20',
    colorClass: 'bg-speedo-10',
  },
  {
    showValue: true,
    value: 3000,
    className: 'rotate-25',
    colorClass: 'bg-speedo-12',
  },
  {
    showValue: false,
    value: 3100,
    className: 'rotate-30',
    colorClass: 'bg-speedo-13',
  },
  {
    showValue: false,
    value: 3200,
    className: 'rotate-35',
    colorClass: 'bg-speedo-14',
  },
  {
    showValue: false,
    value: 3300,
    className: 'rotate-40',
    colorClass: 'bg-speedo-15',
  },
  {
    showValue: false,
    value: 3400,
    className: 'rotate-45',
    colorClass: 'bg-speedo-16',
  },
  {
    showValue: false,
    value: 3500,
    className: 'rotate-50',
    colorClass: 'bg-speedo-17',
  },
  {
    showValue: false,
    value: 3600,
    className: 'rotate-55',
    colorClass: 'bg-speedo-18',
  },
  {
    showValue: false,
    value: 3700,
    className: 'rotate-60',
    colorClass: 'bg-speedo-20',
  },
  {
    showValue: false,
    value: 3800,
    className: 'rotate-65',
    colorClass: 'bg-speedo-21',
  },
  {
    showValue: false,
    value: 3900,
    className: 'rotate-70',
    colorClass: 'bg-speedo-22',
  },
  {
    showValue: true,
    value: 4000,
    className: 'rotate-75',
    colorClass: 'bg-speedo-23',
  },
  {
    showValue: false,
    value: 4100,
    className: 'rotate-80',
    colorClass: 'bg-speedo-23',
  },
  {
    showValue: false,
    value: 4200,
    className: 'rotate-85',
    colorClass: 'bg-speedo-23',
  },
  {
    showValue: false,
    value: 4300,
    className: 'rotate-90',
    colorClass: 'bg-speedo-23',
  },
  {
    showValue: false,
    value: 4400,
    className: 'rotate-95',
    colorClass: 'bg-speedo-23',
  },
  {
    showValue: false,
    value: 4500,
    className: 'rotate-100',
    colorClass: 'bg-speedo-23',
  },
  {
    showValue: false,
    value: 4600,
    className: 'rotate-105',
    colorClass: 'bg-speedo-23',
  },
  {
    showValue: false,
    value: 4700,
    className: 'rotate-110',
    colorClass: 'bg-speedo-23',
  },
  {
    showValue: false,
    value: 4800,
    className: 'rotate-115',
    colorClass: 'bg-speedo-23',
  },
  {
    showValue: false,
    value: 4900,
    className: 'rotate-120',
    colorClass: 'bg-speedo-23',
  },
  {
    showValue: true,
    value: 5000,
    className: 'rotate-125',
    colorClass: 'bg-speedo-23',
  },
];
