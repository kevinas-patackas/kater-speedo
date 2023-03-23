// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GaugesConfig } from '@kater-speedo/types';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { CircularGauge } from './components/CircularGauge';
import { LinearGauge } from './components/LinearGauge';

export function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gaugesConfig, setGaugesConfig] = useState<GaugesConfig | null>(null);

  useEffect(() => {
    const s = io('http://localhost:3000');
    setSocket(s);

    fetch('http://localhost:3000/static/config.json')
      .then((response) => response.json())
      .then((data) => setGaugesConfig(data));

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-wrap justify-center h-screen items-center bg-black overflow-hidden">
      {gaugesConfig?.gauges.map((gauge, index) => (
        <div style={{ position: 'absolute' }} key={index}>
          <div
            style={{
              position: 'absolute',
              top: `${gauge.position.y}px`,
              left: `${gauge.position.x}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div style={{ rotate: `${gauge.position.rotation}deg` }}>
              {(() => {
                switch (gauge.config.type) {
                  case 'circular':
                  case 'half-circular':
                    return (
                      <CircularGauge
                        socket={socket}
                        topic={gauge.topic}
                        config={gauge.config}
                      />
                    );

                  case 'linear-horizontal':
                  case 'linear-vertical':
                    return (
                      <LinearGauge
                        socket={socket}
                        topic={gauge.topic}
                        config={gauge.config}
                      />
                    );

                  default:
                    return <div />;
                }
              })()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
