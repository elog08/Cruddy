<template>
  <div :if="isVisible">
    <b-alert
      :class="msgClass"
      :show="isVisible"
      v-for="message in messages"
      dismissible
        variant="warning">
      {{message}}
    </b-alert>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default ({
  computed: {
    ...mapState(['globalAlert']),
    isVisible() {
      return !!this.globalAlert.messages;
    },
    messages() {
      return this.globalAlert.messages;
    },
  },
});
</script>
