import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';
import { handleCanEvents } from './app/can-handler';
import { SocketServer } from './app/socket';
import { handleUknownEvents } from './app/unknown-handler';
import { environment } from './environments/environment';

const app = express();
app.use(cors());
const httpServer = http.createServer(app);
new SocketServer(httpServer);

httpServer.listen(environment.port, () => {
  console.log('server is running');
});

handleCanEvents();
handleUknownEvents();
