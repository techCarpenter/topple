/**
 * Gets the full string value of the month by number
 * @param {Number} monthInt The number denoting the month
 */
export function getMonthString(monthInt) {
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
}
/**
 * Calculates all payment data for loans.
 * @param {Array} loans Array of loans
 * @param {String} paydownMethod String to set paydown method
 */
export function getTotalPaymentData(loans, paydownMethod) {
  let returnPaymentData = [],
    loansCopy = copy(loans),
    //curLoans = [],
    startDate = loansCopy.map((loan) => loan.startDate).sort(dateSort)[0];

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
  let ratePerMonth, presentValue, minPay, futureValue, curMonthInterest, curMonthPrincipal;

  do {
    let curPaymentObj = {
      date: new Date(curYear, curMonth, 1),
      payments: []
    };

    for (let loan of loansCopy) {
      ratePerMonth = loan.apr / 1200;
      presentValue = loan.balance;
      minPay = loan.minPayment;

      if (loan.startDate.getMonth() === curMonth && loan.startDate.getFullYear() === curYear) {
        /* This section handles initial account balance */
        curPaymentObj.payments.push({
          loanID: loan.id,
          balance: presentValue,
          interestPaid: 0,
          principalPaid: 0,
          totalPaid: 0
        });
      } else if (
        (loan.startDate.getMonth() < curMonth && loan.startDate.getFullYear() === curYear) ||
        loan.startDate.getFullYear() < curYear
      ) {
        /* This section handles monthly payments */
        /* Calculate future value after interest accrues and payment is applied */
        curMonthInterest = presentValue * (1 + ratePerMonth) - presentValue;
        curMonthPrincipal = minPay - curMonthInterest;
        futureValue = parseFloat((presentValue + curMonthInterest - minPay).toFixed(2));

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
          totalPaid: parseFloat((curMonthInterest + curMonthPrincipal).toFixed(2))
        });

        loan.balance = futureValue;
      }
    }

    for (let loan of loansCopy) {
      if (loan.balance === 0) {
        loansCopy.splice(
          loansCopy.findIndex((l) => l.id === loan.id),
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
}

export function dateSort(date1, date2) {
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
}
/**
 * Method to create a new copy with no overlapping references.
 * @param {Object | String | Array | Number | Date } aObject Item to copy
 */
export function copy(aObject) {
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
        ? copy(v)
        : v;
  }

  return bObject;
}

export default {
  copy,
  getMonthString,
  dateSort,
  getTotalPaymentData
};
