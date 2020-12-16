<template>
  <div class="chart-container">
    <AccountSidebar />
    <div class="chart-main-window">
      <ReactiveChart :chart="chart" />
      <!-- <PaydownChart
        id="paydown-chart"
        :loans="this.loans"
        v-if="this.loans.length > 0"
      />
      <h2 v-else>No accounts found.</h2> -->
    </div>
  </div>
</template>

<script>
import AccountSidebar from "../components/AccountSidebar";
import ReactiveChart from "../components/ReactiveChart.vue";
import plotlyConfig from "../data";

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
    loans() {
      return this.$store.getters.getAccounts || [];
    }
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
