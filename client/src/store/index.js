import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import VueSocketio from 'vue-socket.io';
import io from 'socket.io-client';

import initFeathers from '../utils/feathers';
import { initialAuthenticate } from '../utils/auth';

const socket = io('/', { path: '/api/socket.io' });

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage,
// });

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
  },
  plugins: [
    // vuexLocal.plugin,
    service('report', {
      debug: true,
    }),
    service('users'),
    service('symptom'),
    auth({ userService: 'users' }),
  ],
});

(async () => {
  const userId = await initialAuthenticate(feathersClient);
  rootStore.commit('SET_LOGIN', true);
  rootStore.dispatch('users/get', userId).then(console.log, console.error);

})();


Vue.use(VueSocketio, socket, rootStore);

export default rootStore;
