<template>
  <div class="chart-container">
    <AccountSidebar />
    <div v-if="accounts.length > 0" class="chart-main-window">
      <ReactiveChart :chart="chart" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AccountSidebar from "../components/AccountSidebar";
import ReactiveChart from "../components/ReactiveChart.vue";
import { plotlyConfig } from "../data";

export default {
  name: "ChartView",
  data() {
    return {
      chart: plotlyConfig
    };
  },
  components: {
    AccountSidebar,
    ReactiveChart
  },
  computed: {
    ...mapState(["accounts"])
  }
};
</script>

<style scoped>
.chart-main-window {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
}
.chart-container {
  display: flex;
  flex-direction: row;
  flex: 1;
}
</style>
