<template>
  <b-row>
        <b-col></b-col>
        <b-col>
          <h1 class="text-center">Login</h1>
          <login-form v-on:login_success="$router.push('dashboard')"/>
          <b-link to="forgotpass">Forgot Password?</b-link>
        </b-col>
        <b-col></b-col>
  </b-row>
</template>
<script>
import LoginForm from '../components/LoginForm';

export default ({
  name: 'login',
  components: {
    'login-form': LoginForm,
  },
});
</script>
