<template>
  <div class="panel-body">
    <form v-on:submit.prevent="doCreate">
      <vue-form-generator :schema="schema" :model="model" :options="formOptions">
      </vue-form-generator>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default ({
  name: 'create-form',
  methods: {
    ...mapActions({ create: 'site/create' }),
    doCreate() {
      this.create(this.model).then((result) => {
        this.$emit('success');
      }, () => {
        this.$emit('failure');
      });
    },
  },
  data() {
    return {
      model: {
        title: '',
        subdomain: '',
        email: ''
      },
      schema: {
        fields: [
          {
            type: 'input',
            inputType: 'text',
            label: 'Title',
            required: true,
            model: 'title',
            placeholder: 'Some Title',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Sub-domain',
            required: true,
            model: 'subdomain',
            placeholder: 'subdomain.domain.com',
          },
          {
            type: 'input',
            inputType: 'text',
            label: 'Email',
            required: true,
            model: 'email',
            placeholder: 'admin@domain.com',
          },
          {
            type: 'submit',
            buttonText: 'Create',
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
