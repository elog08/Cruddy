import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
// import initConnection from '../utils/connection';
import VueSocketio from 'vue-socket.io';
import io from 'socket.io-client';

import initFeathers from '../utils/feathers';

const socket = io('/', { path: '/api/socket.io' });

const feathersClient = initFeathers({ socket });
const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: '_id' });

Vue.use(Vuex);
Vue.use(FeathersVuex);

// const Console = console;
// Console.info(feathersClient.socket);
// socket.on('connect', Console.info);
// socket.on('disconnect', Console.info);
// socket.on('connect_error', Console.info);
// socket.on('connect_timeout', Console.info);
// socket.on('error', Console.info);
// socket.on('ping', Console.info);

// setTimeout(async () => {
//   await feathersClient.authenticate();
// }, 4000);

const rootStore = new Vuex.Store({
  state: {
    isLoggedIn: false,
    connection: {
      status: false,
    },
  },
  getters: {
    getConnectionStatus: state => (state.connection.status ? { variant: 'success', message: 'Connected!', dismissible: true } : { variant: 'danger', message: 'Disconnected!', dismissable: false }),
  },
  mutations: {
    SOCKET_CONNECT: (state) => {
      state.connection.status = true;
    },
    SOCKET_CONNECT_ERROR: (state) => {
      state.connection.status = false;
    },

  },
  plugins: [
    service('users'),
    auth({ userService: 'users' }),
  ],
});


Vue.use(VueSocketio, socket, rootStore);

export default rootStore;
