export const chartData = {
  type: "line",
  data: {
    labels: [],
    datasets: []
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
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
            display: false,
            labelString: "Payment Period"
          },
          ticks: {}
        }
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: false,
            labelString: "Amount(s) $"
          },
          ticks: {}
        }
      ]
    }
  }
};

export default chartData;
