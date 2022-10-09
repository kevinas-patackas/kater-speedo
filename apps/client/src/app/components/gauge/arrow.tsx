import React from 'react';

export const Arrow: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={`relative h-80 w-8 flex flex-wrap justify-center ${className}`}
    >
      <div className="absolute w-2 h-12 bg-green-500 rounded-full -top-3"></div>
      <div className="absolute w-2 h-5 bg-green-500 rotate-45 rounded-full left-2 -top-4"></div>
      <div className="absolute w-2 h-5 bg-green-500 -rotate-45 rounded-full right-2 -top-4"></div>
    </div>
  );
};
