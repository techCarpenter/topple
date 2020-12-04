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

export default {
  name: "ChartView",
  data() {
    return {
      chart: {
        uuid: "1234",
        traces: [
          {
            x: [1, 2, 3, 4],
            y: [30, 15, 8, 4],
            mode: "lines",
            type: "scatter",
            line: {
              shape: "spline",
              smoothing: 0.6,
              // color: "#e34234",
              width: 2
            },
            name: "Loan 1"
          },
          {
            x: [1, 2, 3, 4],
            y: [50, 25, 13, 7],
            mode: "lines",
            type: "scatter",
            line: {
              shape: "spline",
              smoothing: 0.6,
              // color: "#e34234",
              width: 2
            },
            name: "Loan 2"
          }
        ],
        layout: {
          title: "Paydown Chart",
          xaxis: {
            title: "Month",
            showgrid: true,
            zeroline: true
          },
          yaxis: {
            title: "Loan amount ($)",
            showline: true
          },
          font: {
            family: "Arial",
            size: 14,
            color: "#222222"
          },
          legend: {
            orientation: "h",
            x: 0.5,
            y: 1.05,
            yanchor: "middle",
            xanchor: "center"
          },
          margin: {
            pad: 0
          }
        },
        config: { displaylogo: false, responsive: true }
      }
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
  flex-direction: column;
  align-items: center;
}
.chart-container {
  display: flex;
  flex-direction: row;
  flex-basis: auto;
}
</style>
