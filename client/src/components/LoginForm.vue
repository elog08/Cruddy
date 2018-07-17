<template>
          <div class="panel-body">
            <auth-error/>
            <form v-on:submit.prevent="doLogin">
              <vue-form-generator :schema="schema" :model="model" :options="formOptions">
              </vue-form-generator>
            </form>
          </div>
</template>
<script>
import { mapActions } from 'vuex';
import AuthError from '../components/AuthError';

const Console = console;

export default ({
  name: 'login-form',
  components: {
    'auth-error': AuthError,
  },
  methods: {
    ...mapActions({ authenticate: 'auth/authenticate' }),
    doLogin() {
      const { email, password } = this.model;
      this.authenticate({ email, password, strategy: 'local' }).then((res) => {
        Console.info('doLogin', { res });
        this.$store.commit('SET_LOGIN');
        this.$emit('login_success');
        return Promise.resolve(res);
      }, (err) => {
        Console.info('doLogin', 'failure', { err });
        this.$emit('login_failure');
        return Promise.reject(err);
      });
    },
  },
  data() {
    return {
      model: {
        email: '',
        password: '',
      },
      schema: {
        legend: 'User Info',
        fields: [
          {
            type: 'input',
            inputType: 'email',
            label: 'Email',
            required: true,
            model: 'email',
            placeholder: 'user@example.org',
          },
          {
            type: 'input',
            inputType: 'password',
            label: 'Password',
            required: true,
            model: 'password',
            placeholder: 'Password',
          },
          {
            type: 'submit',
            buttonText: 'Login',
          },
        ],
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
      },
    };
  },
});
</script>
