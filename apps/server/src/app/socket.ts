import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
import { emitTimeEvent } from './time-handler';

export class SocketServer {
  private socket: Server;
  private connections = [];
  static instance: SocketServer;

  static getInstance() {
    return SocketServer.instance;
  }

  constructor(httpServer: HttpServer) {
    SocketServer.instance = this;
    this.socket = new Server(httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    this.startListeners();
  }

  public sendMessage(topic: string, data: unknown) {
    this.connections.forEach((connection) => {
      this.socket.to(connection).emit(topic, data);
    });
  }

  private startListeners() {
    console.log('starting listeners');
    this.socket.on('connection', (connection) => {
      console.log(`New connection: ${connection.id}`);
      this.connections.push(connection.id);

      connection.on('disconnect', () => {
        console.log(`Disconnect: ${connection.id}`);
        this.connections = this.connections.filter(
          (con) => con !== connection.id
        );
      });
    });
  }
}
