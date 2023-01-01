// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SocketTopic } from '@kater-speedo/types';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { FuelGauge } from './components/gauge/FuelGauge';
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
    <div className="flex flex-wrap justify-center h-screen items-center bg-black">
      <div className="flex flex-wrap -mt-10">
        <div className="relative mr-8">
          <RpmGauge socket={socket} />
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
            <TempGauge socket={socket} />
          </div>
        </div>

        <div className="relative ml-8">
          <SpeedGauge socket={socket} />
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
            <FuelGauge socket={socket} />
          </div>
        </div>
        <div className="w-64 ml-8 flex flex-wrap justify-center items-center">
          <TrimIndicator socket={socket} />
        </div>
      </div>
    </div>
  );
}

export default App;
