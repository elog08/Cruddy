<template>
  <b-row>
        <b-col></b-col>
        <b-col>
          <h1 class="text-center">Register</h1>
          <register-form />
        </b-col>
        <b-col></b-col>
  </b-row>
</template>
<script>
import RegisterForm from '../components/RegisterForm';

export default ({
  name: 'register',
  components: {
    'register-form': RegisterForm,
  },
});
</script>
