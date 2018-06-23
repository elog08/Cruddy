import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/containers/Home';
import Dashboard from '@/containers/Dashboard';
import Login from '@/containers/Login';
import Register from '@/containers/Register';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
  ],
});
