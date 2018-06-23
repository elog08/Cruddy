<template>
<div id="app">
<Layout>
</Layout>
      <b-container>
      <div>
<router-view/>
</div>
        <b-jumbotron header="Cruddy"
                     lead="A Simple CRUD App"
        >
          <p>For more information visit our website</p>
        </b-jumbotron>

        <b-alert variant="success" :show="showAlert">
          Hello {{ name }}
        </b-alert>
      </b-container>
    </div>
</template>

<script>
import Layout from './layout/Layout';

export default {
  name: 'App',
  components: { Layout },
};
</script>
