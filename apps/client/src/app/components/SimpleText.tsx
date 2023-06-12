import { SimpleTextConfig, SocketTopic } from '@kater-speedo/types';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

export function SimpleText({
  socket,
  topic,
  config,
}: {
  socket: Socket | null;
  topic: SocketTopic;
  config: SimpleTextConfig;
}) {
  const [value, setValue] = useState<unknown>(
    config.display.initialValue ?? ''
  );

  useEffect(() => {
    if (socket) {
      socket.on(topic, (data: unknown) => {
        setValue(data);
      });
    }
  }, [socket, topic]);

  return (
    <div className={`${config.type}-${topic}-container`}>
      <div className={`${config.type}-${topic}-display-prefix`}>
        {config.display.prefix}
      </div>
      <div className={`${config.type}-${topic}-display-value`}>
        {String(value)}
      </div>
      <div className={`${config.type}-${topic}-display-postfix`}>
        {config.display.postfix}
      </div>
    </div>
  );
}
