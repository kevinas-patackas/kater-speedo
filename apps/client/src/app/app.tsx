// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SocketTopic } from '@kater-speedo/types';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { CircularGauge } from './components/CircularGauge/CircularGauge';
import { FuelGauge } from './components/gauge/FuelGauge';
import { NewFuelGauge } from './components/gauge/newFuelGauge';
import { NewSpeedGauge } from './components/gauge/newSpeedGauge';
import { NewTempGauge } from './components/gauge/newTempGauge';
import { RpmGauge } from './components/gauge/RpmGauge';
import { SpeedGauge } from './components/gauge/SpeedGauge';
import { TempGauge } from './components/gauge/TempGauge';
import { TrimIndicator } from './components/TrimIndicator';

export function App() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = io('http://localhost:3000');
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [setSocket]);

  return (
    <div className="flex flex-wrap justify-center h-screen items-center bg-black overflow-hidden">
      <div className="flex flex-col justify-center items-center">
        <CircularGauge socket={socket} topic={SocketTopic.Speed} />
        {/* <NewSpeedGauge socket={socket} />
        <div className="-mt-[10rem] z-50">
          <NewTempGauge socket={socket} />
        </div> */}
      </div>
      {/* <div className="w-[5rem]"></div>
      <div className="flex flex-col justify-center items-center">
        <NewSpeedGauge socket={socket} />
        <div className="-mt-[10rem] z-50">
          <NewFuelGauge socket={socket} />
        </div>
      </div> */}
    </div>
  );
}

export default App;
