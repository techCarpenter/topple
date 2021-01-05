// Plotly.js chart config
const CONFIG = { displaylogo: false, responsive: true, displayModeBar: true };

const LAYOUT = {
  // title: "Paydown Chart",
  xaxis: {
    title: "Month",
    color: "#f8f8f8",
    showgrid: true,
    zeroline: true,
    showline: true
  },
  yaxis: {
    title: "Loan amount ($)",
    color: "#f8f8f8",
    showline: true
  },
  font: {
    family: "Arial",
    // size: 14,
    color: "#f8f8f8"
  },
  legend: {
    orientation: "h",
    x: 0.5,
    y: 1.05,
    yanchor: "middle",
    xanchor: "center"
  },
  // margin: {
  //   pad: 10
  // },
  paper_bgcolor: "#222222",
  plot_bgcolor: "#222222"
};

const CreateTrace = ({
  x = [],
  y = [],
  mode = "lines",
  type = "scatter",
  line = { shape: "spline", smoothing: 0.6, width: 2 },
  name = ""
} = {}) => ({
  x,
  y,
  mode,
  type,
  line,
  name
});

export const plotlyConfig = {
  uuid: "1234",
  traces: [
    CreateTrace({ x: [1, 2, 3, 4], y: [1, 10, 15, 7] }),
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
  layout: LAYOUT,
  config: CONFIG
};

export default plotlyConfig;
