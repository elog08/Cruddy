<template>
        <b-alert class="fixed-bottom" :variant="status.type" :dismissable="status.dismissable" show>{{status.message}}</b-alert>
</template>
<script>

export default {
  computed: {
    status() {
      return this.$store.getters.getConnectionStatus;
    },
  },
};
</script>
