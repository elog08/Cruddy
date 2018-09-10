<template>
          <div class="panel-body">
            <form v-on:submit.prevent="doChangePassword">
              <vue-form-generator :schema="schema" :model="model" :options="formOptions">
              </vue-form-generator>
            </form>
          </div>
</template>
<script>
import { mapActions } from 'vuex';

const Console = console;

export default ({
  name: 'change-password-form',
  props: {
    user: {
      type: Object,
    },
  },
  methods: {
    ...mapActions({ authenticate: 'auth/authenticate' }),
    doChangePassword() {
      this.$emit('update', { model: this.model });
    },
  },
  data() {
    return {
      model: {
        email: this.user.email,
        oldPassword: '',
        password: '',
        confirm: '',
      },
      schema: {
        legend: 'Reset Password',
        fields: [
          {
            type: 'input',
            inputType: 'email',
            label: 'Email',
            required: true,
            disabled: true,
            model: 'email',
            placeholder: 'user@example.org',
          },
          {
            type: 'input',
            inputType: 'password',
            label: 'Old Password',
            required: true,
            model: 'oldPassword',
            placeholder: 'Password',
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
            buttonText: 'Change Password',
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
