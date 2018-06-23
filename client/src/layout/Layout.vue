<template>
    <div id="app">
        <nav-bar/>
      <b-container>
          <breadcrumbs/>
         <slot></slot>
      </b-container>
    </div>
</template>
<script>
import Navbar from '../components/Navbar';

export default ({
  name: 'layout',
  components: {
    'nav-bar': Navbar,
  },
});
</script>
