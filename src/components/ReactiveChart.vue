<template>
  <div class="chart-wrapper">
    <div :ref="chart.uuid"></div>
  </div>
</template>

<style>
.chart-wrapper {
  padding: 1rem;
  height: 100%;
  width: 100%;
}
</style>

<script>
import Plotly from "plotly.js-basic-dist";

export default {
  name: "ReactiveChart",
  props: {
    chart: {
      type: Object,
      required: true
    }
  },
  mounted() {
    Plotly.plot(
      this.$refs[this.chart.uuid],
      this.chart.traces,
      this.chart.layout,
      this.chart.config
    );
  },
  watch: {
    chart: {
      handler: function() {
        Plotly.react(
          this.$refs[this.chart.uuid],
          this.chart.traces,
          this.chart.layout,
          this.chart.config
        );
      }
    }
  }
};
</script>
