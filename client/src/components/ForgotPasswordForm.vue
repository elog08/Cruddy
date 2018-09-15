<template>
          <div class="panel-body">
            <auth-error/>
            <form v-on:submit.prevent="doForgot">
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
  name: 'forgot-form',
  components: {
    'auth-error': AuthError,
  },
  methods: {
    ...mapActions({ forgot: 'authManagement/create' }),
    doForgot() {
      const { email } = this.model;
      const payload = {
        action: 'sendResetPwd',
        value: { email }
      };
      this.forgot(payload).then((res) => {
        Console.info('doForgot', { res });
        this.$emit('forgot_success');
        return Promise.resolve(res);
      }, (err) => {
        Console.info('doForgot', 'failure', { err });
        this.$emit('forgot_failure');
        return Promise.reject(err);
      });
    },
  },
  data() {
    return {
      model: {
        email: '',
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
            type: 'submit',
            buttonText: 'Send Password Reset',
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
