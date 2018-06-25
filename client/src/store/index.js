import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import VueSocketio from 'vue-socket.io';
import io from 'socket.io-client';

import initFeathers from '../utils/feathers';

const socket = io('/', { path: '/api/socket.io' });

const feathersClient = initFeathers({ socket });
const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: '_id' });

Vue.use(Vuex);
Vue.use(FeathersVuex);

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
