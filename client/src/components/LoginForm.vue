<template>
          <div class="panel-body">
            <form>
              <vue-form-generator :schema="schema" :model="model" :options="formOptions">
              </vue-form-generator>
            </form>
          </div>
</template>
<script>
export default ({
  name: 'login-form',
  data() {
    return {
      model: {
        email: 'name@example.com',
        password: '',
      },
      schema: {
        legend: 'User Info',
        fields: [
          {
            type: 'input',
            inputType: 'email',
            label: 'Email',
            model: 'email',
            placeholder: 'user@example.org',
          },
          {
            type: 'input',
            inputType: 'password',
            label: 'Password',
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
