<template>
  <b-table striped hover :per-page=10 :fields="fields" :items="items">
    <template slot="id" slot-scope="row">
      <b-button @click.stop="doEdit(row.item)">Edit</b-button>
      <b-button @click.stop="doDelete(row.item)">Delete</b-button>
    </template>
  </b-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';


export default {
  name: 'report-list',
  data () {
    return {
      fields: [ 'title', 'description', 'id' ],
    }
  },
  computed: {
    ...mapGetters({'items': 'report/list'})
  },
  mounted() {
    this.getReports({ query: {} }).then(console.info, console.error)
  },
  methods: {
    ...mapActions({ getReports: 'report/find', deleteReport: 'report/remove' }),
      doDelete({_id}) {
        this.$dialog
      .confirm('Please confirm to continue')
      .then((dialog) => {
          this.deleteReport(_id);
      })
      .catch(function() {
    console.log('Clicked on cancel');
  });
    },
    doEdit(item) {
      this.$emit('edit', {item});
    }
  },
};
</script>
