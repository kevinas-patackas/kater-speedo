import * as cors from 'cors';
import * as express from 'express';
import * as http from 'http';
import path = require('path');
import { handleCanEvents } from './app/can-handler';
import { generateCss } from './app/css-generator';
import { handleGpsdEvents } from './app/gpsd-handler';
import { SocketServer } from './app/socket';
import { handleUknownEvents } from './app/unknown-handler';
import { environment } from './environments/environment';

const app = express();
app.use(cors());
console.log(path.join(__dirname, 'assets'));
app.use('/static', express.static(path.join(__dirname, 'assets')));
app.use(express.static('assets'));
const httpServer = http.createServer(app);
new SocketServer(httpServer);

httpServer.listen(environment.port, () => {
  console.log('server is running');
});

handleCanEvents();
handleGpsdEvents();
handleUknownEvents();

generateCss();
