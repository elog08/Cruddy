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
      console.info('Adding Symptom');
      // this.create(this.model).then(() => {
      this.$emit('create', this.model);
      // }, () => {
      //   this.$emit('create_failure');
      // });
    },
  },
  data() {
    return {
      model: {
        weight: 170,
        height: 65,
      },
      schema: {
        fields: [
          {
            type: 'input',
            inputType: 'number',
            label: 'Weight',
            required: true,
            model: 'weight',
            placeholder: 'Weight in Inches',
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'Height',
            required: true,
            model: 'height',
            placeholder: 'Height in Inches',
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
