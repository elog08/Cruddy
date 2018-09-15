<template>
  <b-row>
        <b-col></b-col>
        <b-col>
          <h1 class="text-center">Forgot Password</h1>
          <forgot-password-form v-on:login_success="$router.push('dashboard')"/>
        </b-col>
        <b-col></b-col>
  </b-row>
</template>
<script>
import ForgotPasswordForm from '../components/ForgotPasswordForm';

export default ({
  name: 'forgot-pass',
  components: {
    'forgot-password-form': ForgotPasswordForm,
  },
});
</script>
