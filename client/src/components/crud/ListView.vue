<template>
  <b-table striped hover :per-page=10 :items="feathersProvider"></b-table>
</template>

<script>
import { mapActions } from 'vuex';


export default {
  methods: {
    ...mapActions({ getReports: 'report/find' }),
    feathersProvider(ctx) {
      // Here we don't set isBusy prop, so busy state will be handled by table itself
      // this.isBusy = true

      const { currentPage, perPage, filter, sortBy, sortDesc } = ctx;

      const $sort = {};
      $sort[sortBy] = sortDesc ? 1 : -1;

      const $limit = perPage || 100;

      const $skip = perPage * (currentPage - 1) || 0;

      const query = { $sort, $limit, $skip };

      return this.getReports({ query }).then((result) => {
        const items = result.data;
        console.info('Got', items);
        // Here we could override the busy state, setting isBusy to false
        // this.isBusy = false
        return (items);
      }).catch((error) => {
        console.info('error', error);
        // Here we could override the busy state, setting isBusy to false
        // this.isBusy = false
        // Returning an empty array, allows table to correctly handle busy state in case of error
        return [];
      });
    },
  },
};
</script>
