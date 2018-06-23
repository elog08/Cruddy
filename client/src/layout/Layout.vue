<template>
    <div id="app">
        <nav-bar/>
      <b-container>
        <b-jumbotron header="Cruddy"
                     lead="Create, Read, Update, Delete and more"
        >
          <p>For more information visit our website</p>
          <b-btn variant="primary" href="https://bootstrap-vue.js.org/">More Info</b-btn>
        </b-jumbotron>

        <b-form-group horizontal
                      :label-cols="4"
                      description="Let us know your name."
                      label="Enter your name"
        >
           <b-form-input v-model.trim="name"></b-form-input>
        </b-form-group>

        <b-alert variant="success" :show="showAlert">
          Hello {{ name }}
        </b-alert>
      </b-container>
    </div>
</template>
<script>
import Navbar from '../components/Navbar';

export default ({
    name: 'layout',
    components: {
        'nav-bar': Navbar
    }
});
</script>