<template>
<div>
<image-list/>
  <b-btn  @click="showCreateModal">New Image</b-btn>
  <b-modal ok-disabled cancel-disabled ref="modalCreate">
    <div slot="modal-title">
      <h3>New Image</h3>
    </div>
    <div slot="modal-footer" class="w-100">
      <b-btn size="sm" class="float-right" variant="primary" @click="hideCreateModal">
           Close
         </b-btn>
    </div>
    <create-form v-on:success="hideCreateModal"/>
  </b-modal>
</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CreateForm from '../components/image/CreateForm';
import ListView from '../components/image/ListView';

export default {
  name: 'Images',
  components: { 'create-form': CreateForm, 'image-list': ListView },

  computed: {
    ...mapGetters({ images: 'image/list' }),
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
    this.getListImages({ query: {} });//.then(console.info).catch(console.error);
  },
};

</script>
