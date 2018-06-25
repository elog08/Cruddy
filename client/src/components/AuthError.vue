<template>
    <b-alert show="auth.type==='FeathersError" variant="danger">
      {{authError && authError.message}}
    </b-alert>
</template>
<script>
import { mapState } from 'vuex';

export default ({
  computed: {
    ...mapState(['auth']),
    authError() {
      return this.auth && this.auth.errorOnAuthenticate
          && this.auth.errorOnAuthenticate.message.length > 0
          && this.auth.errorOnAuthenticate;
    },
  },
});
</script>
