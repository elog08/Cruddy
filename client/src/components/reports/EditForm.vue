<template>
  <div class="panel-body">
    <form v-on:submit.prevent="doUpdate">
      <vue-form-generator :schema="schema" :model="model" :options="formOptions">
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
      _id: '',
      title: '',
      description: '',
    },
  },
  mounted() {
    console.log('Props', this.item);
  },
  methods: {
    ...mapActions({ update: 'report/update' }),
    doUpdate() {
      console.dir(this.model);
      this.update([this.model._id, { ...this.item, ...this.model }, {}]).then((result) => {
        this.$emit('success');
      }, () => {
        this.$emit('failure');
      });
    },
  },

  watch: {
    item(item) {
      console.info('New item');
      this.model = { _id: item._id, title: item.title, description: item.description };
    },
  },

  data() {
    return {
      model: { title: '', description: '', _id: '' },
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
