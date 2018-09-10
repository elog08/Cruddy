<template>
<div>

<b-card-group deck
                  class="mb-3">
        <b-card bg-variant="primary"
                text-variant="white"
                header="Load"
                class="text-center">
            <h2>Average: {{sysinfo.load.avgload}}</h2>
            <h2>Current: {{sysinfo.load.currentload}}</h2>
        </b-card>
        <b-card
                header="Memory Usage"
                class="text-center">
            <h2>{{memPerc}}</h2>
            <usage-chart :data="memChart"/>
        </b-card>
        </b-card-group>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import UsageChart from '../components/UsageChart.js';

export default {
  name: 'Status',
  components: { UsageChart },
  computed: {
    ...mapGetters({ sysinfo: 'sysinfo/current' }),
    memPerc() {
      return `${Math.floor(100 * (this.sysinfo.mem.used / this.sysinfo.mem.total))}%`;
    },
    memChart() {
      return {
        labels: ['Free', 'Used'],
        datasets: [
          {
            label: 'Used',
            backgroundColor: ['green', 'grey'],
            data: [this.sysinfo.mem.free, this.sysinfo.mem.used],
          },
        ],
      };
    },
  },
  methods: {
    ...mapActions({ getSysInfo: 'sysinfo/get' }),
  },
  mounted() {
    this.getSysInfo(1).then(console.info).catch(console.error);
  },
};

</script>
