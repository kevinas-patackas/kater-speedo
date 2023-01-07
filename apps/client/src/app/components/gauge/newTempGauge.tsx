import { SocketTopic } from '@kater-speedo/types';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { GaugeTick } from './tick';

function MiddlePart({ value }: { value: number }) {
  const valueThing = '&deg;';
  return (
    <div className={`absolute top-[6rem] flex flex-wrap justify-center`}>
      <div className="w-full text-center text-4xl font-digital-bold -mb-1 text-white">
        &deg;C
      </div>
      <div className="w-full text-center text-8xl font-digital-bold -mb-1 text-white">
        {value}
      </div>
    </div>
  );
}

function DrawArrows() {
  const angle = 135 / 3;
  const start = -45;

  const setup = [
    {
      label: 60,
      mult: 0,
    },
    {
      label: 90,
      mult: 1,
    },
    {
      label: 120,
      mult: 2,
    },
  ];

  return (
    <>
      {setup.map((item) => (
        <div
          key={item.mult}
          style={{ rotate: `${start + item.mult * angle}deg` }}
          className="absolute h-full w-[0.5rem] text-white flex flex-col items-center"
        >
          <div className="text-3xl font-digital-bold">{item.label}</div>
          {/* <div className="bg-white w-full h-[2rem]"></div> */}
        </div>
      ))}
    </>
  );
}

function DrawDividers() {
  const angle = 90 / 60;
  const start = -45;

  const [setup, setSetup] = useState<number[]>([]);

  useEffect(() => {
    const result = [];
    for (let i = -1; i < 61; i++) {
      result.push(i);
    }
    setSetup(result);
  }, []);

  return (
    <>
      {setup.map((item) => (
        <div
          key={item}
          style={{ rotate: `${start + item * angle}deg` }}
          className="absolute h-[24.5rem] w-[0.05rem] text-white flex flex-col items-center"
        >
          {/* <div className="text-3xl font-digital-bold">{item.label}</div> */}
          <div className="bg-black w-full h-[50%]"></div>
        </div>
      ))}
    </>
  );
}

export function NewTempGauge({ socket }: { socket: Socket | null }) {
  const [value, setValue] = useState(0);

  const calcThing = (): string => {
    let color = 'lime';
    let percent = (25 / 60) * (value - 60);

    if (value < 60) {
      percent = 0;
    }
    if (value > 120) {
      percent = 25;
    }

    if (value > 92) {
      color = 'yellow';
    }
    if (value > 95) {
      color = 'red';
    }

    return `conic-gradient(transparent 0%, ${color} 0% ${percent}%, transparent ${percent}%)`;
  };

  useEffect(() => {
    if (socket) {
      socket.on(SocketTopic.Temperature, (data: number) => {
        setValue(data);
      });
    }
  }, [socket]);

  return (
    <div className=" relative h-[15rem] w-[30rem] flex justify-center items-center overflow-hidden">
      <div className="absolute top-0 w-[30rem] h-[30rem] flex justify-center items-center">
        <div className="absolute h-[27rem] w-[27rem] mano-darbas-7 rounded-full -rotate-45"></div>
        <div className="absolute bg-white h-[25.5rem] w-[25.5rem] mano-darbas-4 rounded-full -rotate-45"></div>
        <div className="absolute bg-black h-[25rem] w-[25rem] rounded-full"></div>
        {/* <DrawArrows /> */}
        <div className="absolute h-[24.5rem] w-[24.5rem] rounded-full -rotate-45 mano-darbas-5"></div>
        <div
          style={{ background: calcThing() }}
          className="absolute h-[24.5rem] w-[24.5rem] rounded-full -rotate-45"
        ></div>
        <DrawDividers />
        <div className="absolute h-[20.5rem] w-[20.5rem] bg-black rounded-full"></div>
        <MiddlePart value={value} />
      </div>
    </div>
  );
}

// grid-template-columns: repeat(12, minmax(0, 1fr));
