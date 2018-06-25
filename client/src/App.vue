<template>
<div id="app">
<Layout>
  <router-view/>
</Layout>
</div>
</template>

<script>
import Layout from './layout/Layout';

export default {
  name: 'App',
  components: { Layout },
};
</script>
