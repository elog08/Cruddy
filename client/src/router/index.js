import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import Home from '@/views/Home';
import Dashboard from '@/views/Dashboard';
import Login from '@/views/Login';
import Register from '@/views/Register';
import Reports from '@/views/Reports';
import Profile from '@/views/Profile';
import Stats from '@/views/Stats';
import Images from '@/views/Images';
import ForgotPass from '@/views/ForgotPass';

Vue.use(Router);

const router = new Router({
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
        auth: true,
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
      path: '/forgotpass',
      name: 'ForgotPass',
      title: 'Forgot Password',
      component: ForgotPass,
      meta: {
        breadcrumb: 'Forgot Password',
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
      path: '/profile',
      name: 'Profile',
      title: 'Profile',
      component: Profile,
      meta: {
        breadcrumb: 'Profile',
        auth: true,
      },
    },
    {
      path: '/reports',
      name: 'Reports',
      title: 'Reports',
      component: Reports,
      meta: {
        breadcrumb: 'Reports',
        auth: true,
      },
    }, {
      path: '/stats',
      name: 'Stats',
      title: 'Stats',
      component: Stats,
      meta: {
        breadcrumb: 'Stats',
        auth: false,
      },
    }, {
      path: '/images',
      name: 'Images',
      title: 'Images',
      component: Images,
      meta: {
        breadcrumb: 'Images',
        auth: false,
      },
    },
  ],
});


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.auth);
  console.log('Auth check', store.getters.getLoggedInState);
  if (requiresAuth && !store.getters.getLoggedInState) {
    next('/');
  } else {
    next();
  }
});

export default router;
