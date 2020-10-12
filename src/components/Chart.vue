<template>
  <div class="chart-wrapper">
    <canvas id="paydown-chart" class="chart-canvas"></canvas>
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

export default {
  name: "Chart",
  data() {
    return {
      paydownChartData: paydownChartData,
      loans: [
        {
          id: 1,
          name: "Discover",
          balance: 16000,
          apr: 4.5,
          minPayment: 186,
          startDate: new Date("2017-11-01T00:00:00"),
          color: "#e34234"
        },
        {
          id: 2,
          name: "Car loan",
          balance: 14583,
          apr: 3.7,
          minPayment: 316,
          startDate: new Date("2018-01-28T00:00:00"),
          color: "#148cd6"
        }
      ]
    };
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      //const myChart =
      return new Chart(ctx, chartData);
    },
    getMonthString(monthInt) {
      switch (monthInt) {
        case 0:
          return "January";
        case 1:
          return "February";
        case 2:
          return "March";
        case 3:
          return "April";
        case 4:
          return "May";
        case 5:
          return "June";
        case 6:
          return "July";
        case 7:
          return "August";
        case 8:
          return "September";
        case 9:
          return "October";
        case 10:
          return "November";
        default:
          return "December";
      }
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
    getTotalPaymentData(loans, paydownMethod) {
      let returnPaymentData = [],
        loansCopy = this.copy(loans),
        //curLoans = [],
        startDate = loansCopy
          .map(loan => loan.startDate)
          .sort(this.dateSort)[0];

      if (paydownMethod === "avalanche") {
        loansCopy.sort((loan1, loan2) => {
          if (loan1.apr < loan2.apr) {
            return -1;
          } else if (loan1.apr > loan2.apr) {
            return 1;
          } else {
            return 0;
          }
        });
      }

      let curYear = startDate.getFullYear(),
        curMonth = startDate.getMonth();
      let ratePerMonth,
        presentValue,
        minPay,
        futureValue,
        curMonthInterest,
        curMonthPrincipal;

      do {
        let curPaymentObj = {
          date: new Date(curYear, curMonth, 1),
          payments: []
        };

        for (let loan of loansCopy) {
          ratePerMonth = loan.apr / 1200;
          presentValue = loan.balance;
          minPay = loan.minPayment;

          if (
            loan.startDate.getMonth() === curMonth &&
            loan.startDate.getFullYear() === curYear
          ) {
            /* This section handles initial account balance */
            curPaymentObj.payments.push({
              loanID: loan.id,
              balance: presentValue,
              interestPaid: 0,
              principalPaid: 0,
              totalPaid: 0
            });
          } else if (
            (loan.startDate.getMonth() < curMonth &&
              loan.startDate.getFullYear() === curYear) ||
            loan.startDate.getFullYear() < curYear
          ) {
            /* This section handles monthly payments */
            /* Calculate future value after interest accrues and payment is applied */
            curMonthInterest = presentValue * (1 + ratePerMonth) - presentValue;
            curMonthPrincipal = minPay - curMonthInterest;
            futureValue = parseFloat(
              (presentValue + curMonthInterest - minPay).toFixed(2)
            );

            if (futureValue >= presentValue && futureValue !== 0) {
              alert("Minimum payment will not cover interest every month.");
              break;
            }
            if (futureValue < 0) {
              curMonthPrincipal += futureValue;
              futureValue = 0;
            }
            curPaymentObj.payments.push({
              loanID: loan.id,
              balance: futureValue,
              interestPaid: parseFloat(curMonthInterest.toFixed(2)),
              principalPaid: parseFloat(curMonthPrincipal.toFixed(2)),
              totalPaid: parseFloat(
                (curMonthInterest + curMonthPrincipal).toFixed(2)
              )
            });

            loan.balance = futureValue;
          }
        }

        for (let loan of loansCopy) {
          if (loan.balance === 0) {
            loansCopy.splice(
              loansCopy.findIndex(l => l.id === loan.id),
              1
            );
          }
        }

        returnPaymentData.push(curPaymentObj);

        /* Calculate Next Payment Date */
        if (curMonth === 11) {
          curYear++;
          curMonth = 0;
        } else {
          curMonth++;
        }
      } while (loansCopy.length > 0);

      return returnPaymentData;
    },
    dateSort(date1, date2) {
      let year1 = date1.getFullYear(),
        month1 = date1.getMonth(),
        year2 = date2.getFullYear(),
        month2 = date2.getMonth();

      if (year1 < year2) {
        return -1;
      } else if (year1 > year2) {
        return 1;
      } else {
        if (month1 < month2) {
          return -1;
        } else if (month1 > month2) {
          return 1;
        } else {
          return 0;
        }
      }
    },
    copy(aObject) {
      if (!aObject) {
        return aObject;
      }

      let v;
      let bObject = Array.isArray(aObject) ? [] : {};
      for (const k in aObject) {
        v = aObject[k];
        bObject[k] =
          Object.prototype.toString.call(v) === "[object Date]"
            ? new Date(v.getTime())
            : typeof v === "object"
            ? this.copy(v)
            : v;
      }

      return bObject;
    },
    loanPaymentData() {
      return this.getTotalPaymentData(this.loans, "avalanche");
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
    this.paydownChartData.options.title.text = `Debt Free ${this.getMonthString(
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
        return `${this.getMonthString(
          date.getMonth()
        )} ${date.getFullYear().toString()}`;
      }
    };
    this.paydownChartData.options.scales.xAxes[0].ticks = {
      callback: date => {
        return (
          this.getMonthString(date.getMonth()).substr(0, 3) +
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
    this.createChart("paydown-chart", this.paydownChartData);
  }
};
</script>
