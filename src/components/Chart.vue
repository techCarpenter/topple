<template>
  <div class="chart-wrapper">
    <canvas :id="this.id" class="chart-canvas"></canvas>
  </div>
</template>

<style>
.chart-wrapper {
  padding: 1rem;
  height: 90vh;
  width: 90vw;
  margin: 0 auto;
}
@media screen and (max-width: 600px) {
  .chart-canvas {
    min-height: 300px;
    max-height: 300px;
  }
}
</style>

<script>
import Chart from "chart.js";
import paydownChartData from "../paydown-data.js";
import util from "../assets/js/functions";

export default {
  name: "Chart",
  props: {
    id: {
      type: String,
      required: true
    },
    loans: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      paydownChartData: paydownChartData,
      colorArray: [
        "#ff4c00",
        "#ffbb00",
        "#c1e000",
        "#00805f",
        "#3c00dd",
        "#74249c",
        "#ff5cc4",
        "#ff6f00",
        "#ffd100",
        "#87c100",
        "#007bcc",
        "#4a00bd",
        "#9d43b7",
        "#ff2d8f",
        "#ff8b00",
        "#ffe800",
        "#4fa100",
        "#006bff",
        "#4d009e",
        "#c562d2",
        "#ff0053"
      ]
    };
  },
  methods: {
    createChart(chartData) {
      const ctx = document.getElementById(this.id);
      //const myChart =
      return new Chart(ctx, chartData);
    },
    getDataSets(loans, paymentData) {
      let dataSets = [];
      loans.forEach(loan => {
        dataSets.push({
          label: loan.name,
          fill: false,
          backgroundColor: loan.color,
          borderColor: loan.color,
          borderWidth: 3,
          borderCapStyle: "round",
          pointRadius: 0,
          pointHoverRadius: 3,
          pointHitRadius: 3,
          data: paymentData.map(date => {
            let paymentIndex = date.payments.findIndex(
              payment => payment.loanID === loan.id
            );
            if (paymentIndex >= 0) {
              return date.payments[paymentIndex].balance;
            }
            return null;
          })
        });
      });
      return dataSets;
    },
    loanPaymentData() {
      return util.getTotalPaymentData(this.loans, "avalanche");
    }
  },
  mounted() {
    this.paydownChartData.data.labels = this.loanPaymentData()
      .map(loan => loan.date)
      .filter((date, index, self) => {
        return (
          index ===
          self.findIndex(d => {
            return (
              d.getMonth() === date.getMonth() &&
              d.getFullYear() === date.getFullYear()
            );
          })
        );
      });
    this.paydownChartData.data.datasets = this.getDataSets(
      this.loans,
      this.loanPaymentData()
    );
    this.paydownChartData.options.title.text = `Debt Free ${util.getMonthString(
      this.loanPaymentData()[this.loanPaymentData().length - 1].date.getMonth()
    )} ${this.loanPaymentData()
      [this.loanPaymentData().length - 1].date.getFullYear()
      .toString()}`;

    this.paydownChartData.options.tooltips.callbacks = {
      label: (tooltipItem, data) => {
        let label = data.datasets[tooltipItem.datasetIndex].label || "";
        label += label ? ": " : "";
        return label + "$" + tooltipItem.yLabel;
      },
      title: (tooltipItem, data) => {
        let date = data.labels[tooltipItem[0].index];
        return `${util.getMonthString(
          date.getMonth()
        )} ${date.getFullYear().toString()}`;
      }
    };
    this.paydownChartData.options.scales.xAxes[0].ticks = {
      callback: date => {
        return (
          util.getMonthString(date.getMonth()).substr(0, 3) +
          " '" +
          date
            .getFullYear()
            .toString()
            .substr(2)
        );
      }
    };
    this.paydownChartData.options.scales.yAxes[0].ticks = {
      callback: function(value) {
        //, index, values) {
        return "$" + value;
      }
    };
    this.createChart(this.paydownChartData);
  }
};
</script>
