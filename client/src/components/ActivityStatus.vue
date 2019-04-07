<template>
        <b-alert v-if="status" 
          id="activityStatus" 
          v-on:click="toggle"
          :class="'fixed-bottom' + this.ghost ? ' ghost' : ''"
          :variant="status.type"
          show>{{status.message}}
        </b-alert>
</template>
<style>
  #activityStatus {
    width: 130px;
  }

  #activityStatus .ghost {
    opacity: 0.4
  }
</style>
<script>
export default {
  methods: {
    toggle() {
      console.info('Toggling');
      this.ghost = !this.ghost;
    }
  },
  data() {
    return {
      ghost: false
    };
  },
  computed: {
    status() {
      return this.$store.getters.getActivityStatus;
    },
  },
};
</script>
