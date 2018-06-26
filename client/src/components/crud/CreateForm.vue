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
    ...mapActions({ create: 'report/create' }),
    doCreate() {
      this.create(this.model).then(() => {
        this.$emit('create_success');
      }, () => {
        this.$emit('create_failure');
      });
    },
  },
  data() {
    return {
      model: {
        title: '',
        description: '',
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
            type: 'textArea',
            label: 'Description',
            model: 'description',
            hint: 'Max 500 characters',
            max: 500,
            placeholder: 'Description',
            rows: 4,
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
