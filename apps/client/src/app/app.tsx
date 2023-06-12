// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GaugesConfig, TechnicalSocketTopic } from '@kater-speedo/types';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { CircularCompass } from './components/CircularCompass';
import { CircularGauge } from './components/CircularGauge';
import { LinearGauge } from './components/LinearGauge';
import { SimpleCompass } from './components/SimpleCompass';
import { SimpleText } from './components/SimpleText';

const refreshStyles = () => {
  const stylesElementId = `kater-gauges-styles`;
  const existing = document.getElementById(stylesElementId);
  if (existing) {
    existing.remove();
  }

  const headElement = document.getElementsByTagName('head')[0];
  const newLinkElement = document.createElement('link');
  newLinkElement.id = stylesElementId;
  newLinkElement.rel = 'stylesheet';
  newLinkElement.type = 'text/css';
  newLinkElement.href = `http://localhost:3000/static/gauges-styles.css`;

  headElement.appendChild(newLinkElement);
};

export function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gaugesConfig, setGaugesConfig] = useState<GaugesConfig | null>(null);

  useEffect(() => {
    refreshStyles();
  }, []);

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

  useEffect(() => {
    if (socket) {
      socket.on(TechnicalSocketTopic.ConfigChanged, () => {
        refreshStyles();
        fetch('http://localhost:3000/static/config.json')
          .then((response) => response.json())
          .then((data) => setGaugesConfig(data));
      });
    }
  }, [socket]);

  return (
    <div className="flex flex-wrap justify-center h-screen items-center bg-black overflow-hidden">
      {/* <div style={{ position: 'absolute' }}>
        <div
          style={{
            position: 'absolute',
            top: '-245px',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CircularCompass heading={heading} />
        </div>
      </div> */}

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
                  case 'simple-text':
                    return (
                      <SimpleText
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
