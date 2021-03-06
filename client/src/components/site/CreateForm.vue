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
import { mapActions, mapGetters } from 'vuex';
const Console = console;

export default {
  name: 'create-form',
  props: ['images'],
  methods: {
    ...mapActions({ create: 'site/create', getListImages: 'image/find' }),
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
  watch: {
    'model.image': {
      handler(newImageName) {
        try {
          const [ image ] = this.images.filter(image => image.name === newImageName);
          this.model.env = image.env;
          } 
        catch (e) {
          Console.error(e);
        }
      },
      deep: true
    }
  },
  mounted() {
    this.getListImages({ query: {} });
  },
  
  data() {
    return {
      model: {
        title: '',
        subdomain: '',
        email: '',
        env: ['ADMIN_EMAIL=user@domain.com'],
        extrahosts: ['localhost:127.0.0.1'],
        username: '',
        image: '',
        password: '',
      },
      schema: {
        groups: [
          {
            legend: 'Site Details',
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
            ],
          },
          {
            legend: 'Image Details',
            fields: [
              {
                type: 'select',
                label: 'Image',
                model: 'image',
                values: [...this.images.map(image => image.name)],
              },
              {
                type: 'array',
                label: 'Environmental Variables',
                model: 'env',
                showRemoveButton: true,
                itemFieldClasses: 'form-control',
                itemContainerClasses: 'input-group pb-2',
                newElementButtonLabelClasses: 'btn mt-2',
                validator: (value, field, model) => {
                  const validPattern = /([^=;]+=[^=;]+(;(?!$)|$))+/;
                  const isValid = value
                    .filter(v => !!v)
                    .every(v => v && v.match(validPattern));
                  return isValid
                    ? []
                    : ['Environment var pattern invalid, use KEY=VAL pairs'];
                },
              },
              {
                type: 'array',
                label: 'Extra Hosts',
                model: 'extrahosts',
                showRemoveButton: true,
                itemFieldClasses: 'form-control',
                itemContainerClasses: 'input-group pb-2',
                newElementButtonLabelClasses: 'btn mt-2',
                validator: (value, field, model) => {
                  const validPattern = /([^:;]+:[^:;]+(;(?!$)|$))+/;
                  const isValid = value
                    .filter(v => !!v)
                    .every(v => v && v.match(validPattern));
                  return isValid
                    ? []
                    : ['Extra hosts var pattern invalid, use KEY=VAL pairs'];
                },
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Email',
                required: true,
                model: 'email',
                placeholder: 'admin@domain.com',
              },

            ],
          },
          {
            legend: 'Security',
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'Basic Auth Username',
                required: false,
                model: 'basic_username',
                placeholder: 'admin',
              },
              {
                type: 'input',
                inputType: 'password',
                label: 'Basic Auth Password',
                required: false,
                model: 'basic_password',
                placeholder: 'password',
              },
            ],
          },
          {
            fields: [{
              type: 'submit',
              buttonText: 'Create',
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
