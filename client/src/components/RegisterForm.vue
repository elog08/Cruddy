<template>
          <div class="panel-body">
            <b-alert :show="registerError && registerError.type==='FeathersError'" variant="danger">
              {{registerError && registerError.message}}
            </b-alert>
            <form v-on:submit.prevent="doRegister">
              <vue-form-generator :schema="schema" :model="model" :options="formOptions">
              </vue-form-generator>
            </form>
          </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import AuthError from '../components/AuthError';

export default ({
  name: 'register-form',
  components: {
    'auth-error': AuthError,
  },
  methods: {
    ...mapActions('users', {
      createUser: 'create',
    }),
    doRegister() {
      const { username, email, password } = this.model;
      this.createUser({ username, email, password }).then(() => {
        this.$emit('register_success');
      }, () => {
        this.$emit('register_failure');
      });
    },
  },
  computed: {
    ...mapState({
      registerError: 'users/errorOnCreate',
    }),
  },
  data() {
    return {
      model: {
        username: '',
        email: '',
        password: '',
        confirm: '',
      },
      schema: {
        legend: 'User Info',
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'Username',
            required: true,
            model: 'username',
            placeholder: 'Username',
          },
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
            type: 'input',
            inputType: 'password',
            label: 'Confirm Password',
            required: true,
            model: 'confirm',
            placeholder: 'Confirm',
            validator: (value, field, model) => {
              if (value !== model.password) {
                return ["Passwords don't match."];
              }
              return true;
            },
          },
          {
            type: 'submit',
            buttonText: 'Register',
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
