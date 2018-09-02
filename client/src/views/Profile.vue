<template>
<div>
    <h1>{{user.username}}'s Profile</h1>
    <profile-form v-on:update="updateProfile" :user="user"/>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import ProfileForm from '../components/ProfileForm';

export default {
  name: 'Profile',
  components: { 'profile-form': ProfileForm },
  computed: {
    ...mapGetters({ user: 'getCurrentUser' }),
  },
  methods: {
    ...mapActions({ update: 'users/update' }),
    updateProfile(eventData) {
      const toUpdate = { ...this.user, ...eventData.model };
      console.info('Update Profile');
      this.update([this.user.id, toUpdate, {}]).then(console.info, console.error);
    },
  },
};
</script>
