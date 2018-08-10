<template>
  <div :if="isVisible">
    <b-alert
      :class="msgClass"
      :show="isVisible"
      dismissible
        variant="danger">
      {{message}}
    </b-alert>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default ({
  computed: {
    ...mapState(['auth']),
    isVisible() {
      return !!this.auth.errorOnAuthenticate;
    },
    message() {
      return this.isVisible && this.auth.errorOnAuthenticate.message || '';
    },
    msgClass() {
      return this.isVisible && this.auth.errorOnAuthenticate.className || '';
    },
  },
});
</script>
