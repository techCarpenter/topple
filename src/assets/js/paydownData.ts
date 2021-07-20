import { PAYDOWN_METHODS } from "@/data";
import {
  AccountPayoffDetail,
  DebtAccount,
  PayPeriodDetail,
  PaymentDetail
} from "@/interfaces";

/**
 * Gets the full string value of the month by number
 * @param {Number} monthInt The number denoting the month
 * @returns {String} The name of the corresponding month
 */
function getMonthString(monthInt: number): string {
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
 * @param {string} paydownMethod String to set paydown method
 * @param {number} initSnowball Starting snowball payment amount (default is 0)
 * @returns {object} An array of payment details with the date and an array of payments
 */
function getTotalPaymentData(
  loans: DebtAccount[],
  paydownMethod: string = PAYDOWN_METHODS.snowball,
  initSnowball: number = 0
) {
  let totalInterestPaid: number = 0,
    totalPrincipalPaid: number = 0,
    accountPayoffOrder: AccountPayoffDetail[] = [],
    allPaymentData = [],
    snowballAmt: number = initSnowball,
    loansCopy: DebtAccount[] = copy(loans),
    startDate: Date = loansCopy.map(loan => loan.dateOpened).sort(dateSort)[0],
    curYear: number = startDate.getFullYear(),
    curMonth: number = startDate.getMonth(),
    ratePerMonth: number,
    presentValue: number,
    minPay: number,
    futureValue: number,
    curMonthInterest: number,
    curMonthPrincipal: number;

  loansCopy = prioritizeLoans(loansCopy, paydownMethod);

  // Loop over each payment period
  do {
    let extraPayment: number = 0,
      curPaymentObj: PayPeriodDetail = {
        date: new Date(curYear, curMonth, 1),
        payments: []
      };

    // loop over each loan
    for (let loan of loansCopy) {
      let paymentDetails: PaymentDetail = {
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
        loan.dateOpened.getMonth() === curMonth &&
        loan.dateOpened.getFullYear() === curYear
      ) {
        // Handle initial account balance
        paymentDetails.loanID = loan.id;
        paymentDetails.balance = presentValue;
      } else if (
        (loan.dateOpened.getMonth() < curMonth &&
          loan.dateOpened.getFullYear() === curYear) ||
        loan.dateOpened.getFullYear() < curYear
      ) {
        // Handle payments

        // Calculate future value after interest accrues and payment is applied
        curMonthInterest = presentValue * (1 + ratePerMonth) - presentValue;
        curMonthPrincipal = minPay - curMonthInterest;
        futureValue = parseFloat(
          (presentValue + curMonthInterest - minPay).toFixed(2)
        );

        if (futureValue >= presentValue && futureValue !== 0) {
          throw new Error(
            "Minimum payment will not cover interest every month."
          );
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
      } else {
        //prevent adding empty payment details to payments
        continue;
      }
      curPaymentObj.payments.push(paymentDetails);
    }

    // Add extra payments before pushing pay period
    if (
      curPaymentObj.payments.length > 0 &&
      (extraPayment > 0 || snowballAmt > 0) &&
      paydownMethod !== PAYDOWN_METHODS.minPayments &&
      !(
        curPaymentObj.date.getFullYear() === startDate.getFullYear() &&
        curPaymentObj.date.getMonth() === startDate.getMonth()
      )
    ) {
      let paymentIndex = curPaymentObj.payments.length - 1,
        highPriorityAccount: PaymentDetail,
        formattedExtraPayment: number,
        eraseExtraPayment = false;

      extraPayment += snowballAmt;
      formattedExtraPayment = parseFloat(extraPayment.toFixed(2));

      while (
        formattedExtraPayment > 0 &&
        !(
          curPaymentObj.payments[paymentIndex].balance === 0 &&
          paymentIndex === 0
        )
      ) {
        while (
          curPaymentObj.payments[paymentIndex].balance <= 0 &&
          paymentIndex > 0
        ) {
          paymentIndex--;
        }

        highPriorityAccount = curPaymentObj.payments[paymentIndex];

        if (highPriorityAccount.balance > 0) {
          if (highPriorityAccount.balance - formattedExtraPayment < 0) {
            formattedExtraPayment -= highPriorityAccount.balance;
            highPriorityAccount.principalPaid += highPriorityAccount.balance;
            highPriorityAccount.totalPaid += highPriorityAccount.balance;
            highPriorityAccount.balance = 0;
          } else {
            highPriorityAccount.principalPaid += formattedExtraPayment;
            highPriorityAccount.totalPaid += formattedExtraPayment;
            highPriorityAccount.balance -= formattedExtraPayment;
            eraseExtraPayment = true;
          }

          let loanIndex = loansCopy.findIndex(
            l => l.id === highPriorityAccount.loanID
          );
          if (loanIndex >= 0) {
            loansCopy[loanIndex].balance = highPriorityAccount.balance;
          }

          if (eraseExtraPayment) {
            formattedExtraPayment = 0;
            eraseExtraPayment = false;
          }
        }
      }
    }

    loansCopy = loansCopy.filter(loan => {
      if (loan.balance <= 0) {
        snowballAmt += loan.minPayment;
        accountPayoffOrder.push({
          id: loan.id,
          payoffDate: curPaymentObj.date,
          newSnowball: snowballAmt
        });
        return false;
      } else {
        return true;
      }
    });

    loansCopy = prioritizeLoans(loansCopy, paydownMethod);

    curPaymentObj.payments.forEach(payment => {
      totalInterestPaid += payment.interestPaid;
      totalPrincipalPaid += payment.principalPaid;
    });

    allPaymentData.push(curPaymentObj);

    // Calculate Next Payment Date
    if (curMonth === 11) {
      curYear++;
      curMonth = 0;
    } else {
      curMonth++;
    }
  } while (loansCopy.length > 0);

  return {
    paymentArray: allPaymentData,
    totalInterestPaid,
    totalPrincipalPaid,
    totalPaid: totalPrincipalPaid + totalInterestPaid,
    accountPayoffOrder,
    startDate:
      getMonthString(startDate.getMonth() + 1) + " " + startDate.getFullYear(),
    endDate: getMonthString(curMonth) + " " + curYear,
    paydownMethod,
    startingSnowball: initSnowball,
    finalSnowball: snowballAmt
  };
}

function prioritizeLoans(
  loanArray: DebtAccount[],
  paymentMethod: string = PAYDOWN_METHODS.minPayments
): DebtAccount[] {
  if (paymentMethod === PAYDOWN_METHODS.minPayments) return loanArray;

  if (paymentMethod === PAYDOWN_METHODS.avalanche) {
    loanArray.sort((loan1, loan2) => {
      if (loan1.apr < loan2.apr) {
        return -1;
      } else if (loan1.apr > loan2.apr) {
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
  } else if (paymentMethod === PAYDOWN_METHODS.snowball) {
    loanArray.sort((loan1, loan2) => {
      if (loan1.balance > loan2.balance) {
        return -1;
      } else if (loan1.balance < loan2.balance) {
        return 1;
      } else {
        if (loan1.apr < loan2.apr) {
          return -1;
        } else if (loan1.apr > loan2.apr) {
          return 1;
        }
        return 0;
      }
    });
  }

  return loanArray;
}

/**
 * Callback for sorting by date
 * @param {Date} date1
 * @param {Date} date2
 * @returns 1 for first is greater, 0 for equal, and -1 for second is greater
 */
function dateSort(date1: Date, date2: Date): number {
  // if (typeof date1 !== Date || typeof date2 !== Date) {
  //   return 0;
  // }

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
 * @param {any} aObject Item to copy
 */
function copy(aObject: any): any {
  if (!aObject) {
    return aObject;
  }

  let v;
  let bObject: any = Array.isArray(aObject) ? [] : {};
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
 * @param {number} value The value to format
 * @param {number} decPlaces Number of decimal places
 * @returns {String} The value as a percentage-formatted string
 */
function percentFormat(value: number, decPlaces: number = 2): string {
  return (value / 100).toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: decPlaces,
    maximumFractionDigits: decPlaces
  });
}

/**
 * Format a number as a currency
 * @param {number} value The value to format
 * @returns {string} The value as a currency-formatted string
 */
function currencyFormat(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function dateStringFromDate(date: Date): string {
  // if (typeof date === Date) {
  return `${date.getFullYear().toString()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}`;
  // }
  // return "";
}

function dateFromString(dateString: String): Date {
  let [year, month, day] = dateString.split("-");
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

export {
  copy,
  getMonthString,
  dateSort,
  getTotalPaymentData,
  prioritizeLoans,
  currencyFormat,
  percentFormat,
  dateFromString,
  dateStringFromDate
};
