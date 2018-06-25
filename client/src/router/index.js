import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Dashboard from '@/views/Dashboard';
import Login from '@/views/Login';
import Register from '@/views/Register';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        breadcrumb: 'Home',
      },
      children: [

      ],
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        breadcrumb: 'Dashboard',
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        breadcrumb: 'Login',
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        breadcrumb: 'Register',
      },
    },
  ],
});
