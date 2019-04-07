import { mapState } from 'vuex';
import Vue from 'vue';

export default (serviceName) => {
  const verbs = [
    'Create', 'Find', 'Patch', 'Update', 'Remove',
  ];
  const errorKeys = verbs.map(v => `errorOn${v}`);
  return Vue.component('serviceError', {
    computed: {
      ...mapState({ state: serviceName }),
      errors() {
        return errorKeys.filter(key => this.state[key]).map(key => this.state[key]);
      },
    },
    template: `<div>
        <b-alert
            v-for="error in errors"
            :class="error.className"
            :show="error"
            dismissible
            variant="danger">
            <strong>{{error.name}}</strong>
            <p>{{error.message}}</p>
        </b-alert>
        </div>`,
  });
};
