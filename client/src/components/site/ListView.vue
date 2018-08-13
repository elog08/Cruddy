<template>
<div>
  <b-button @click.stop="getSites">Refresh</b-button>
  <b-table striped hover :per-page=10 :fields="fields" :items="items">
    <template slot="status" slot-scope="row">
      <span>{{row.item.status}}</span>
    </template>
    <template slot="containerId" slot-scope="row">
      <b-button @click.stop="action(row.item, 'restart')">Restart</b-button>
      <b-button @click.stop="action(row.item, 'stop')">Stop</b-button>
    </template>
    <template slot="id" slot-scope="row">
      <b-button @click.stop="doDelete(row.item)">Delete</b-button>
    </template>
  </b-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'site-list',
  data () {
    return {
      fields: [ 'title', 'subdomain', 'status', 'containerId', 'id' ],
    }
  },
  computed: {
    ...mapGetters({'items': 'site/list'})
  },
  mounted() {
    this.getSites({ query: {} }).then(console.info, console.error)
  },
  methods: {
    action(id, action) {
      console.info(id, action);
    },
    ...mapActions({ getSites: 'site/find', deleteSite: 'site/remove' }),
      doDelete({_id}) {
        this.$dialog
          .confirm('Please confirm to continue')
          .then((dialog) => {
              this.deleteSite(_id);
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
