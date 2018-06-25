import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';

function initialize({ socket }) {
  const app = feathers()
    .configure(socketio(socket))
    .configure(auth({ storage: window.localStorage }));
  return app;
}
export default initialize;
