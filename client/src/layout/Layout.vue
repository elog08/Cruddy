<template>
    <div id="app">
        <nav-bar/>
      <b-container>
          <connection-status/>
          <breadcrumbs/>
         <slot></slot>
      </b-container>
    </div>
</template>
<script>
import Navbar from '../components/Navbar';
import ConnectionStatus from '../components/ConnectionStatus';

export default ({
  name: 'layout',
  components: {
    'nav-bar': Navbar,
    'connection-status': ConnectionStatus,
  },
});
</script>
