<template>
        <b-alert id="connectionStatus"
            @click="toggle"
            :class="this.ghost ? 'fixed-bottom ghost' : 'fixed-bottom'"
            :variant="status.type"
            show>{{status.message}}
        </b-alert>
</template>
<style>
  #connectionStatus {
    user-select: none;
    -webkit-user-select : none;
    -moz-user-select : none;
    -ms-user-select: none;
    width: 130px;
  }
  #connectionStatus.ghost {
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
      return this.$store.getters.getConnectionStatus;
    },
  },
};
</script>
