import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Dashboard from '@/views/Dashboard';
import Login from '@/views/Login';
import Register from '@/views/Register';
import CreateForm from '@/components/crud/CreateForm';
import ListView from '@/components/crud/ListView';

import store from '../store/index';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      title: Home,
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
      title: Dashboard,
      meta: {
        breadcrumb: 'Dashboard',
      },
      children:[
          {
            path: 'create',
            name: 'CreateForm',
            title: 'Create Report',
            component: CreateForm,
            meta: {
              breadcrumb: 'Create Report',
            },
          },
          {
            path: 'list',
            name: 'ListReports',
            title: 'List Reports',
            component: ListView,
            meta: {
              breadcrumb: 'List Reports',
            },
          },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      title: 'Login',
      component: Login,
      meta: {
        breadcrumb: 'Login',
      },
    },
    {
      path: '/register',
      name: 'Register',
      title: 'Register',
      component: Register,
      meta: {
        breadcrumb: 'Register',
      },
    }
  ],
});
