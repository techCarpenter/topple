<template>
  <div class="w-full h-full">
    <div :ref="chart.uuid"></div>
  </div>
</template>

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
    try {
      Plotly.plot(
        this.$refs[this.chart.uuid],
        this.chart.traces,
        this.chart.layout,
        this.chart.config
      );
    } catch (error) {
      console.log(error);
    }
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

<style></style>
