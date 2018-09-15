<template>
    <div id="app">
        <nav-bar/>
      <b-container>
          <global-alert/>
          <connection-status/>
          <breadcrumbs/>
         <slot></slot>
      </b-container>
    </div>
</template>
<script>
import Navbar from '../components/Navbar';
import ConnectionStatus from '../components/ConnectionStatus';
import GlobalAlert from '../components/GlobalAlert';

export default ({
  name: 'layout',
  components: {
    'nav-bar': Navbar,
    'global-alert': GlobalAlert,
    'connection-status': ConnectionStatus,
  },
});
</script>
