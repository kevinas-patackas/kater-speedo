import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';
import { start } from './app';
import { SocketServer } from './app/socket';
import { environment } from './environments/environment';

const app = express();
app.use(cors());
const httpServer = http.createServer(app);
new SocketServer(httpServer);

httpServer.listen(environment.port, () => {
  console.log('server is running');
});

start();
