import { SocketTopic } from '@kater-speedo/types';
import { sleep } from './utils/utils';
import { SocketServer } from './socket';

export async function handleTimeEvents() {
  emitTimeEvent();
  await sleep(5000);
  handleTimeEvents();
}

export async function emitTimeEvent() {
  const socketServer = SocketServer.getInstance();

  const date = new Date();
  socketServer.sendMessage(
    SocketTopic.Time,
    `${String(date.getHours()).padStart(2, '0')}:${String(
      date.getMinutes()
    ).padStart(2, '0')}`
  );
  console.log(`${date.getHours()}:${date.getMinutes()}`);
}
