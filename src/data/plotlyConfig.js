// Plotly.js chart config
const CONFIG = {
  displaylogo: false,
  responsive: true,
  staticPlot: true
};

const LAYOUT = {
  xaxis: {
    // title: "Month",
    color: "#f8f8f8"
  },
  yaxis: {
    // title: "Amount ($)",
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
  margin: {
    t: 5,
    r: 5,
    b: 20,
    l: 20
  },
  paper_bgcolor: "#222222",
  plot_bgcolor: "#222222"
};

const CreateTrace = ({
  name = "",
  x = [],
  y = [],
  mode = "lines",
  type = "scatter",
  line = { shape: "spline", smoothing: 0.6, width: 2 }
} = {}) => ({
  name,
  x,
  y,
  mode,
  type,
  line
});

const plotlyConfig = {
  uuid: "1234",
  traces: [
    CreateTrace({ x: [1, 2, 3, 4], y: [1, 10, 15, 7], name: "CreateTrace" }),
    CreateTrace({ x: [1, 2, 3, 4], y: [4, 20, 15, 30], name: "CreateTrace1" }),
    CreateTrace({ x: [1, 2, 3, 4], y: [30, 4, 20, 15], name: "CreateTrace2" }),
    CreateTrace({ x: [1, 2, 3, 4], y: [15, 30, 4, 20], name: "CreateTrace3" }),
    CreateTrace({ x: [1, 2, 3, 4], y: [20, 15, 30, 4], name: "CreateTrace4" }),
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

export { plotlyConfig, CreateTrace };
