import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';

const socket = io('http://localhost:8080/api', { transports: ['websocket'] });
const app = feathers()
  .configure(socketio(socket))
  .configure(auth({ storage: window.localStorage }));

export default app;
