<template>
<div>
    <h1>{{user.username}}'s Profile</h1>
    <b-tabs>
  <b-tab title="Basic Info" active>
    <profile-form v-on:update="updateProfile" :user="user"/>
  </b-tab>
  <b-tab title="Password" >
    <change-password-form v-on:update="updatePassword" :user="user"/>
  </b-tab>
</b-tabs>

</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import ProfileForm from '../components/ProfileForm';
import ChangePasswordForm from '../components/ChangePasswordForm';

export default {
  name: 'Profile',
  components: { 'profile-form': ProfileForm, 'change-password-form': ChangePasswordForm },
  computed: {
    ...mapGetters({ user: 'getCurrentUser' }),
  },
  methods: {
    ...mapActions({ update: 'users/update', authManagement: 'authManagement/create' }),
    updatePassword({ model: { oldPassword, password } }) {
      const payload = {
        action: 'passwordChange',
        value: {
          oldPassword,
          password,
          user: { email: this.user.email },
        },
      };
      this.$store.dispatch('authManagement/create', payload).then(console.log, console.error);
    },
    updateProfile(eventData) {
      const toUpdate = { ...this.user, ...eventData.model };
      console.info('Update Profile');
      this.update([this.user.id, toUpdate, {}]).then(console.info, console.error);
    },
  },
};
</script>
