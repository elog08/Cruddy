<template>
<div>
    <h1>Reports</h1>
    <report-list v-on:edit="showEditModal"/>
  <b-btn  @click="showCreateModal">Create</b-btn>
  <b-modal ok-disabled cancel-disabled ref="modalCreate">
    <div slot="modal-title">
      <h3>New Report</h3>
    </div>
    <div slot="modal-footer" class="w-100">
      <b-btn size="sm" class="float-right" variant="primary" @click="show=false">
           Close
         </b-btn>
    </div>
    <create-form v-on:success="hideCreateModal"/>
  </b-modal>
  <b-modal ok-disabled cancel-disabled ref="modalEdit">
    <div slot="modal-title">
      <h3>Edit Report</h3>
    </div>
    <div slot="modal-footer" class="w-100">
      <b-btn size="sm" class="float-right" variant="primary" @click="show=false">
           Close
         </b-btn>
    </div>
    <edit-form :item="currentReport" v-on:success="hideEditModal"/>
  </b-modal>
</div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import CreateForm from '../components/reports/CreateForm';
import EditForm from '../components/reports/EditForm';
import ListView from '../components/reports/ListView';

export default {
  name: 'Profile',
  components: { 'create-form': CreateForm , 'edit-form': EditForm , 'report-list': ListView },
  computed: {
    ...mapGetters({ currentReport: 'report/current' }),
  },
  methods: {
    ...mapActions({ update: 'report/update'}),
    ...mapMutations({setCurrent: 'report/setCurrent'}),
    showCreateModal () {
      this.$refs.modalCreate.show()
    },
    showEditModal ({item}) {
      this.setCurrent(item._id);
      this.$refs.modalEdit.show();
    },
    hideCreateModal () {
      this.$refs.modalCreate.hide()
    },
    hideEditModal () {
      this.$refs.modalEdit.hide()
    }
  },
};
</script>
