<template>
<div>
  <site-list/>
  <b-btn  @click="showCreateModal">Create</b-btn>
  <b-modal ok-disabled cancel-disabled ref="modalCreate">
    <div slot="modal-title">
      <h3>New Site</h3>
    </div>
    <div slot="modal-footer" class="w-100">
      <b-btn size="sm" class="float-right" variant="primary" @click="show=false">
           Close
         </b-btn>
    </div>
    <create-form v-bind:images="images" v-on:success="hideCreateModal"/>
  </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CreateForm from '../components/site/CreateForm';
import ListView from '../components/site/ListView';

export default {
  name: 'Dashboard',
  components: { 'create-form': CreateForm, 'site-list': ListView },
  computed: {
    ...mapGetters({ currentReport: 'site/current' }),
    ...mapGetters({ images: 'image/list' })
  },
  methods: {
    ...mapActions({ update: 'site/update', getListImages: 'image/find' }),
    ...mapMutations({ setCurrent: 'site/setCurrent' }),
    showCreateModal() {
      this.$refs.modalCreate.show();
    },
    hideCreateModal() {
      this.$refs.modalCreate.hide();
    },
  },
  mounted() {
    this.getListImages({query: {}}).then(console.info).catch(console.error);
  },
};
</script>
