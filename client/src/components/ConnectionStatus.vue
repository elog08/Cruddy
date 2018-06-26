<template>
        <b-alert id="connectionStatus" class="fixed-bottom"
            :variant="status.type"
            show>{{status.message}}
        </b-alert>
</template>
<style>
  #connectionStatus {
    width: 130px;
  }
</style>
<script>
export default {
  computed: {
    status() {
      return this.$store.getters.getConnectionStatus;
    },
  },
};
</script>
