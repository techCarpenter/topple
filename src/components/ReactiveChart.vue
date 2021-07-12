<template>
  <div class="w-full plotly-container">
    <div :id="`plotly-${chart.uuid}`"></div>
  </div>
</template>

<script>
import { defineComponent, onBeforeUnmount, onMounted, watch } from "vue";
import Plotly from "plotly.js-basic-dist";

export default defineComponent({
  name: "ReactiveChart",
  props: {
    chart: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    onMounted(() => {
      try {
        Plotly.newPlot(
          "plotly-" + props.chart.uuid,
          props.chart.traces,
          props.chart.layout,
          props.chart.config
        );
      } catch (err) {
        console.error("Reactive Chart Error:", err);
      }
    });
    let unwatchChart = watch(
      () => props.chart,
      (newChart, oldChart) => {
        Plotly.react(
          "plotly-" + newChart.uuid,
          newChart.traces,
          newChart.layout,
          newChart.config
        );
      },
      { deep: true }
    );
    onBeforeUnmount(() => unwatchChart());
  }
});
</script>

<style scoped>
.plotly-container {
  min-height: 450px;
}
</style>
