import { PAYDOWN_METHODS } from "../../data";

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
export function getTotalPaymentData(loans, paydownMethod, initSnowball = 0) {
  console.log("Paydown method:", paydownMethod);
  let returnPaymentData = [],
    snowballAmt = initSnowball,
    loansCopy = copy(loans),
    startDate = loansCopy.map(loan => loan.startDate).sort(dateSort)[0];

  loansCopy = prioritizeLoans(loansCopy, paydownMethod);

  let curYear = startDate.getFullYear(),
    curMonth = startDate.getMonth();

  let ratePerMonth;
  let presentValue;
  let minPay;
  let futureValue;
  let curMonthInterest;
  let curMonthPrincipal;

  /* Loop over each payment period */
  do {
    // let rePrioritize = false;
    let extraPayment = 0;
    let curPaymentObj = { date: new Date(curYear, curMonth, 1), payments: [] };

    // loop over each loan
    for (let loan of loansCopy) {
      let paymentDetails = {
        loanID: null,
        balance: null,
        interestPaid: 0,
        principalPaid: 0,
        totalPaid: 0
      };
      ratePerMonth = loan.apr / 1200;
      presentValue = loan.balance;
      minPay = loan.minPayment;

      if (
        loan.startDate.getMonth() === curMonth &&
        loan.startDate.getFullYear() === curYear
      ) {
        /* Handle initial account balance */
        paymentDetails.loanID = loan.id;
        paymentDetails.balance = presentValue;
        // rePrioritize = true;
      } else if (
        (loan.startDate.getMonth() < curMonth &&
          loan.startDate.getFullYear() === curYear) ||
        loan.startDate.getFullYear() < curYear
      ) {
        /* Handle payments */

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
        if (futureValue <= 0) {
          extraPayment += -futureValue;
          curMonthPrincipal += futureValue;
          futureValue = 0;
        }
        paymentDetails.loanID = loan.id;
        paymentDetails.balance = futureValue;
        paymentDetails.interestPaid = parseFloat(curMonthInterest.toFixed(2));
        paymentDetails.principalPaid = parseFloat(curMonthPrincipal.toFixed(2));
        paymentDetails.totalPaid = parseFloat(
          (curMonthInterest + curMonthPrincipal).toFixed(2)
        );

        loan.balance = futureValue;
      }
      curPaymentObj.payments.push(paymentDetails);
    }
    // TODO: decide if re-prioritizing is the right decision
    // if (rePrioritize) {
    //   loansCopy = prioritizeLoans(loansCopy, paydownMethod);
    // }

    // Add extra payments before pushing pay period
    if (
      (extraPayment > 0 || snowballAmt > 0) &&
      paydownMethod !== PAYDOWN_METHODS.MIN_PAYMENTS
    ) {
      let paymentIndex = curPaymentObj.payments.length - 1;
      let highPriorityAccount;
      extraPayment += snowballAmt;
      let formattedExtraPayment = parseFloat(extraPayment.toFixed(2));

      while (
        curPaymentObj.payments[paymentIndex].balance <= 0 &&
        paymentIndex > 0
      ) {
        paymentIndex--;
      }

      highPriorityAccount = curPaymentObj.payments[paymentIndex];
      if (highPriorityAccount.balance > 0) {
        if (highPriorityAccount.balance - formattedExtraPayment < 0)
          formattedExtraPayment = highPriorityAccount.balance;

        highPriorityAccount.balance -= formattedExtraPayment;
        highPriorityAccount.principalPaid += formattedExtraPayment;
        highPriorityAccount.totalPaid += formattedExtraPayment;

        let loanIndex = loansCopy.findIndex(
          l => l.id === highPriorityAccount.loanID
        );
        if (
          loanIndex >= 0 &&
          loansCopy[loanIndex].balance - formattedExtraPayment >= 0
        ) {
          loansCopy[loanIndex].balance -= formattedExtraPayment;
        }
      }
    }

    for (let loan of loansCopy) {
      if (loan.balance <= 0) {
        snowballAmt += loan.minPayment;
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
}

export function prioritizeLoans(
  loanArray,
  paymentMethod = PAYDOWN_METHODS.MIN_PAYMENTS
) {
  if (paymentMethod === PAYDOWN_METHODS.MIN_PAYMENTS) return loanArray;
  if (paymentMethod === PAYDOWN_METHODS.AVALANCHE) {
    loanArray.sort((loan1, loan2) => {
      if (loan1.apr > loan2.apr) {
        return -1;
      } else if (loan1.apr < loan2.apr) {
        return 1;
      } else {
        if (loan1.balance > loan2.balance) {
          return -1;
        } else if (loan1.balance < loan2.balance) {
          return 1;
        }
        return 0;
      }
    });
  } else if (paymentMethod === PAYDOWN_METHODS.SNOWBALL) {
    loanArray.sort((loan1, loan2) => {
      if (loan1.balance > loan2.balance) {
        return -1;
      } else if (loan1.balance < loan2.balance) {
        return 1;
      } else {
        if (loan1.apr > loan2.apr) {
          return -1;
        } else if (loan1.apr < loan2.apr) {
          return 1;
        }
        return 0;
      }
    });
  }
  loanArray.forEach((loan, index) => {
    loan.priority = index + 1;
  });
  loanArray.sort((loan1, loan2) => {
    if (loan1.priority > loan2.priority) {
      return -1;
    } else if (loan1.priority < loan2.priority) {
      return 1;
    } else {
      return 0;
    }
  });
  return loanArray;
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

/**
 * Format a number as a percentage
 * @param {Number} value The value to format
 * @param {Number} decPlaces Number of decimal places
 */
export function percentFormat(value, decPlaces = 2) {
  return (value / 100).toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: decPlaces,
    maximumFractionDigits: decPlaces
  });
}

/**
 * Format a number as a currency
 * @param {Number} value The value to format
 */
export function currencyFormat(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export default {
  copy,
  getMonthString,
  dateSort,
  getTotalPaymentData,
  prioritizeLoans,
  currencyFormat,
  percentFormat
};
