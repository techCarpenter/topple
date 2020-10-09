export const paydownChartData = {
  type: "line",
  data: {
    labels: [],
    datasets: []
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: ""
    },
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {}
    },
    hover: {
      mode: "nearest",
      intersect: true
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Payment Period"
          },
          ticks: {}
        }
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Amount(s) $"
          },
          ticks: {}
        }
      ]
    }
  }
};

export default paydownChartData;
