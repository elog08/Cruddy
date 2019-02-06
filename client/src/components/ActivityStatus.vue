<template>
        <b-alert id="activityStatus" class="fixed-bottom"
            :variant="status.type"
            show>{{status.message}}
        </b-alert>
</template>
<style>
  #activityStatus {
    width: 130px;
  }
</style>
<script>
export default {
  computed: {
    status() {
      return this.$store.getters.getActivityStatus;
    },
  },
};
</script>
