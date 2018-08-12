<template>
  <div class="panel-body">
    <form v-on:submit.prevent="doCreate">
      <vue-form-generator :schema="schema" :model="model">
      </vue-form-generator>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default ({
  name: 'edit-form',
  props: {
    item: {
        title: "",
        description: ""
    },
  },
  methods: {
    ...mapActions({ update: 'report/update' }),
    doUpdate() {
      this.update(this.model).then((result) => {
        this.$emit('success');
      }, () => {
        this.$emit('failure');
      });
    },
  },

  data() {
    return {
      model: { title: '', description: '',  item: this.props.item },
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
            buttonText: 'Update',
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
