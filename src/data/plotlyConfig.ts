import { PlotlyTrace } from "@/interfaces";

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
  shapes: [
    {
      type: "line",
      x0: null as Date,
      y0: 0,
      x1: null as Date,
      yref: "paper",
      y1: 1,
      line: {
        color: "#ff4646cc",
        width: 1.5
      }
    }
  ],
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
    r: 15,
    b: 20,
    l: 40
  },
  paper_bgcolor: "#222222",
  plot_bgcolor: "#222222",
  datarevision: 0
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
  traces: [] as PlotlyTrace[],
  layout: LAYOUT,
  config: CONFIG
};

export { plotlyConfig, CreateTrace };
