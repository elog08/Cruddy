<template>
<b-navbar toggleable="md" type="dark" variant="info">
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
  <b-navbar-brand href="#">Cruddy</b-navbar-brand>
  <b-collapse is-nav id="nav_collapse">

    <!-- Right aligned nav items -->
    <b-navbar-nav v-if="isLoggedIn && user" class="ml-auto">
      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>{{user.username}}</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item @click="logout" href="#">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

    <b-navbar-nav v-if="isLoggedIn">
      <b-nav-item to="/dashboard">Dashboard</b-nav-item>
      <b-nav-item to="/report/list">Reports</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav v-else>
      <b-nav-item to="/login">Login</b-nav-item>
      <b-nav-item to="/register">Register</b-nav-item>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default ({
  name: 'nav-bar',
  computed: {
    ...mapGetters({ isLoggedIn: 'getLoggedInState', user: 'getCurrentUser' }),
  },
  methods: {
    ...mapActions({ authLogout: 'auth/logout' }),
    ...mapMutations({ clearUsers: 'users/clearAll', unsetLogin: 'UNSET_LOGIN' }),
    logout() {
      this.authLogout();
      this.clearUsers();
      this.unsetLogin();
    },
  },
});
</script>
