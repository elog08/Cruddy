<template>
  <div class="panel-body">
    <form v-on:submit.prevent="doCreate">
      <vue-form-generator :schema="schema" :model="model" :options="formOptions">
      </vue-form-generator>
    </form>
  </div>
</template>
<style>
#environmental-variables {
  width: 100%;
}

legend {
    font-size: 18px;
    font-weight: bold;
}

</style>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'create-form',
  props: ['images'],
  methods: {
    ...mapActions({ create: 'image/create', getListImages: 'image/find' }),
    doCreate() {
      this.create([this.model, {}]).then(
        (result) => {
          this.$emit('success');
        },
        () => {
          this.$emit('failure');
        },
      );
    },
  },
  mounted() {
  },
  data() {
    return {
      model: {
        image: '',
        tag: 'latest',
      },
      schema: {
        groups: [
          {
            legend: 'Image Details',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'Image Name',
                required: true,
                model: 'image',
                placeholder: 'user/image',
              },
               {
                type: 'input',
                inputType: 'text',
                label: 'Tag',
                required: true,
                model: 'tag',
                placeholder: 'latest',
              },
            ]
          },
          {
            fields: [{
              type: 'submit',
              buttonText: 'Pull',
            }],
          },
        ],
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
      },
    };
  },
};
</script>
