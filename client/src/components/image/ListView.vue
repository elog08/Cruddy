<template>
<div>
  <h1>Images</h1>
  <b-table striped hover :per-page=10 :items="imageNames">
  </b-table>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Images',
  computed: {
    ...mapGetters({ images: 'image/list' }),
    imageNames() {
      return this.images && this.images.map(({name}) => ({name}));
    }
  },
  methods: {
    ...mapActions({ getListImages: 'image/find' }),
  },
  mounted() {
    this.getListImages({ query: {} });
  }
};
</script>
