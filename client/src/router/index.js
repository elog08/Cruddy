import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import Dashboard from '@/views/Dashboard';
import Login from '@/views/Login';
import Register from '@/views/Register';
import CreateForm from '@/components/crud/CreateForm';
import ListView from '@/components/crud/ListView';

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
    },
    {
      path: '/report/create',
      name: 'CreateForm',
      title: 'Create Report',
      component: CreateForm,
      meta: {
        breadcrumb: 'CreateForm',
      },
    },
    {
      path: '/report/list',
      name: 'ListView',
      title: 'List Reports',
      component: ListView,
      meta: {
        breadcrumb: 'ListView',
      },
    },
  ],
});
