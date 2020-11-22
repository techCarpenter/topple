<template>
  <div class="chart-container">
    <AccountSidebar />
    <div class="chart-main-window">
      <PaydownChart
        id="paydown-chart"
        :loans="this.loans"
        v-if="this.loans.length > 0"
      />
      <h2 v-else>No accounts found.</h2>
    </div>
  </div>
</template>

<script>
import AccountSidebar from "../components/AccountSidebar";
import PaydownChart from "../components/PaydownChart";

export default {
  name: "ChartView",
  components: {
    AccountSidebar,
    PaydownChart
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
  flex-direction: column;
  align-items: center;
}
.chart-container {
  display: flex;
  flex-direction: row;
  flex-basis: auto;
}
</style>
