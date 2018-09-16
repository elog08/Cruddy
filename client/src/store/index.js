import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import VueSocketio from 'vue-socket.io';
import io from 'socket.io-client';

import initFeathers from '../utils/feathers';
import { initialAuthenticate } from '../utils/auth';

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
    globalAlert: {
      messages: [],
    },
  },
  getters: {
    getLoggedInState: state => state.isLoggedIn,
    getCurrentUser: state => state.users.copy,
    getConnectionStatus: state => (state.connection.status ? { variant: 'success', message: 'Connected!', dismissible: true } : { variant: 'danger', message: 'Disconnected!', dismissable: false }),
  },
  mutations: {
    SOCKET_CONNECT: (state) => {
      state.connection.status = true;
    },
    SOCKET_CONNECT_ERROR: (state) => {
      state.connection.status = false;
    },
    SET_LOGIN: (state) => {
      state.isLoggedIn = true;
    },
    UNSET_LOGIN: (state) => {
      state.isLoggedIn = false;
    },
    ADD_GLOBAL_MESSAGE: (state, message) => {
      const id = Date.now();
      state.globalAlert.messages.unshift({ id, ...message });
    },
    REMOVE_GLOBAL_MESSAGE: (state, id) => {
      const idx = state.globalAlert.messages.findIndex(message => message.id === id);
      state.globalAlert.messages.splice(idx, 1);
    },
    CLEAR_GLOBAL_MESSAGES: (state, message) => {
      state.globalAlert.messages = [];
    },
  },
  plugins: [
    // vuexLocal.plugin,
    service('report', {
      debug: true,
    }),
    service('users'),
    service('site'),
    service('image'),
    service('sysinfo'),
    service('authManagement'),
    auth({ userService: 'users' }),
  ],
});

// Synchronous Logged In State Check

// if (localStorage.getItem('feathers-jwt'))
// {
//   rootStore.commit('SET_LOGIN', true);
// }

(async () => {
  const userId = await initialAuthenticate(feathersClient);
  rootStore.dispatch('users/get', userId).then(() => {
    rootStore.commit('SET_LOGIN', true);
  }, () => {
    rootStore.commit('SET_LOGIN', false);
  });
})();


Vue.use(VueSocketio, socket, rootStore);

export default rootStore;
