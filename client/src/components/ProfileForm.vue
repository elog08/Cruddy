<template>
          <div class="panel-body">
            <form v-on:submit.prevent="doUpdate">
              <vue-form-generator :schema="schema" :model="model" :options="formOptions">
              </vue-form-generator>
            </form>
          </div>
</template>
<script>

const Console = console;

export default ({
  name: 'profile-form',
  props: {
    user: {
      type: Object,
    },
  },
  methods: {
    doUpdate() {
      Console.info('Profile form update', this.model);
      this.$emit('update', { model: this.model });
    },
  },
  data() {
    return {
      model: {
        name: this.user.name,
      },
      schema: {
        legend: 'User Info',
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'Name',
            model: 'name',
            required: true,
            placeholder: 'Full Name',
          },
          {
            type: 'submit',
            buttonText: 'Update Profile',
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
