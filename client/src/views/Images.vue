<template>
<div>
<h1>Images</h1>
<b-table striped hover :per-page=10 :fields="fields" :items="images">

  </b-table>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Images',
  computed: {
    ...mapGetters({ images: 'image/list' }),
  },
  methods: {
    ...mapActions({ getListImages: 'image/find' }),
  },
  mounted() {
    this.getListImages({ query: {} }).then(console.info).catch(console.error);
  },
};

</script>
