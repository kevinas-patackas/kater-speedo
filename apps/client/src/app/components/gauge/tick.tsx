import React from 'react';

export const GaugeTick: React.FC<{
  active?: boolean;
  className?: string;
  value?: string;
  big?: boolean;
  long?: boolean;
  thick?: boolean;
  customColorClass?: string;
}> = ({ active, className, value, long, thick, big, customColorClass }) => {
  return (
    <div
      className={`${
        big ? 'h-112' : 'h-72'
      } w-8 flex flex-wrap justify-center ${className}`}
    >
      <div
        className={`relative rounded ${long ? 'h-12 -top-2' : 'h-8'} ${
          thick ? 'w-2.5' : 'w-2'
        } ${active ? customColorClass ?? 'bg-speedo-1' : 'bg-slate-700'}`}
      ></div>
      <div
        className={`absolute font-digital-bold text-white ${
          big ? 'text-3xl -top-12' : 'text-xl -top-10'
        }`}
      >
        {value}
      </div>
    </div>
  );
};
