import { SocketTopic } from '@kater-speedo/types';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export function App() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = io('http://192.168.1.112:3000');
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [setSocket]);

  const [temperature, setTemperature] = useState(0);
  const [rpm, setRpm] = useState(0);
  useEffect(() => {
    if (socket) {
      socket.on(SocketTopic.Temperature, (data: number) => {
        setTemperature(data);
      });

      socket.on(SocketTopic.RPM, (data: number) => {
        setRpm(data);
      });
    }
  }, [socket]);

  return (
    <div>
      <h1>Temperatūra: {temperature}</h1>
      <h1>RPM: {rpm}</h1>
    </div>
  );
}

export default App;
