import { SocketTopic } from '@kater-speedo/types';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { GaugeTick } from './tick';

function MiddlePart({ value }: { value: number }) {
  return (
    <div
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-wrap justify-center`}
    >
      <div className="w-full text-center text-4xl font-digital-bold text-white">
        KM/H
      </div>
      <div className="w-full text-center text-9xl font-digital-bold text-white">
        {value}
      </div>
      <div className="w-full text-center text-4xl font-digital-bold text-white">
        &nbsp;&nbsp;
      </div>
    </div>
  );
}

function DrawDividers() {
  const angle = 270 / 100;
  const start = -135;

  const [setup, setSetup] = useState<number[]>([]);

  useEffect(() => {
    const result = [];
    for (let i = -1; i < 101; i++) {
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
          className="absolute h-[27.5rem] w-[0.15rem]"
        >
          <div className="bg-black w-full h-[50%]"></div>
        </div>
      ))}
    </>
  );
}

function DrawArrows() {
  const angle = 270 / 10;
  const start = -135;

  const setup = [
    {
      label: 0,
      mult: 0,
    },
    {
      label: 10,
      mult: 1,
    },
    {
      label: 20,
      mult: 2,
    },
    {
      label: 30,
      mult: 3,
    },
    {
      label: 40,
      mult: 4,
    },
    {
      label: 50,
      mult: 5,
    },
    {
      label: 60,
      mult: 6,
    },
    {
      label: 70,
      mult: 7,
    },
    {
      label: 80,
      mult: 8,
    },
    {
      label: 90,
      mult: 9,
    },
    {
      label: 100,
      mult: 10,
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

export function NewSpeedGauge({ socket }: { socket: Socket | null }) {
  const [value, setValue] = useState(0);

  const calcThing = (): string => {
    let color = 'rgb(34 211 238)';
    let percent = 0.75 * value;

    if (percent > 75) {
      percent = 75;
    }
    if (percent > 20) {
      color = 'rgb(34 211 238)';
    }
    if (percent > 30) {
      color = 'yellow';
    }
    if (percent > 60) {
      color = 'red';
    }

    // return `conic-gradient(transparent 0%, green 0% 30%, lime 30% 40%, yellow 40% 50%, orange 50% 60%, red 60% 75%, transparent 75%)`;
    return `conic-gradient(transparent 0%, ${color} 0% ${percent}%, transparent ${percent}%)`;
  };

  useEffect(() => {
    if (socket) {
      socket.on(SocketTopic.Speed, (data: number) => {
        setValue(data);
      });
    }
  }, [socket]);

  return (
    // container
    <div className="relative h-[35rem] w-[35rem]  flex items-center justify-center">
      {/* // danger | gauge + danger = 30.5 DONE */}
      <div className="absolute h-[30.5rem] w-[30.5rem] mano-darbas-3 rounded-full -rotate-135"></div>

      {/* gauge DONE */}
      <div className="absolute h-[29rem] w-[29rem] mano-darbas-2 rounded-full -rotate-135"></div>
      <DrawArrows />

      {/* outline | gauge - outline = 28.5 DONE */}
      <div className="absolute h-[28.5rem] w-[28.5rem] bg-black rounded-full"></div>

      {/* outlineSpacer | gauge - outline - outlineSpacer = 27.5 DONE */}
      <div className="absolute h-[27.5rem] w-[27.5rem] rounded-full -rotate-135 mano-darbas-6"></div>

      {/* outlineSpacer | gauge - outline - outlineSpacer = 27.5 */}
      <div
        style={{ background: calcThing() }}
        className="absolute h-[27.5rem] w-[27.5rem] rounded-full -rotate-135"
      ></div>
      <DrawDividers />

      {/* tick | gauge - outline - outlineSpacer - tick = 23.5 */}
      <div className="absolute h-[23.5rem] w-[23.5rem] bg-black rounded-full"></div>
      <MiddlePart value={value} />
    </div>
  );
}
