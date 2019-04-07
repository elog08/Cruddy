<template>
<div>

<b-card-group deck v-if="sysinfo"
                  class="mb-3">
        <b-card bg-variant="primary"
                text-variant="white"
                header="Load"
                class="text-center">
            <h2>Average: {{sysinfo.load.avgload || percentage}}</h2>
            <h2>Current: {{sysinfo.load.currentload || percentage}}</h2>
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

let intervalPointer;
const INTERVAL_DELAY = 5000;

export default {
  name: 'Status',
  components: { UsageChart },
  filters: {
    percentage: function (value) {
      if (!value) return ''
      return value.toFixed(2) + '%';
    }
  },
  computed: {
    ...mapGetters({ sysinfo: 'sysinfo/current' }),
    memPerc() {
      return `${Math.floor(100 * (this.sysinfo.mem.used / this.sysinfo.mem.total))}%`;
    },
    memFreeMB() {
      return this.sysinfo.mem.free / 1000000;
    },
    memUsedMB() {
      return this.sysinfo.mem.used / 1000000;
    },
    memChart() {
      return {
        labels: ['Free', 'Used'],
        datasets: [
          {
            label: 'Used',
            backgroundColor: ['green', 'grey'],
            data: [this.memFreeMB, this.memUsedMB],
          },
        ],
      };
    },
  },
  methods: {
    ...mapActions({ getSysInfo: 'sysinfo/get' }),
  },
  mounted() {
    intervalPointer = setInterval(() => this.getSysInfo(1), INTERVAL_DELAY);
  },
  beforeDestroy() {
    clearInterval(intervalPointer);
  }
};

</script>
