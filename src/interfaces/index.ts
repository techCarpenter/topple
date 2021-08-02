interface DebtAccount {
  name: string;
  dateOpened: Date;
  id: string;
  uid: string;
  balance: number;
  provider: string;
  apr: number;
  minPayment: number;
}

interface PaymentDetail {
  loanID: string;
  balance: number;
  interestPaid: number;
  principalPaid: number;
  totalPaid: number;
}

interface PayPeriodDetail {
  date: Date;
  payments: PaymentDetail[];
}

interface AccountPayoffDetail {
  id: string;
  payoffDate: Date;
  newSnowball: number;
}

interface PlotlyTrace {
  name: string;
  x: number[];
  y: number[];
  mode: string;
  type: string;
  line: {
    shape: string;
    smoothing: number;
    width: number;
  };
}

interface PaydownDataDetail {
  paymentArray: PayPeriodDetail[];
  totalInterestPaid: number;
  totalPrincipalPaid: number;
  totalPaid: number;
  accountPayoffOrder: AccountPayoffDetail[];
  startDate: Date;
  endDate: Date;
  monthsLeft: number;
  paydownMethod: string;
  startingSnowball: number;
  finalSnowball: number;
}

interface UserProfileDetail {
  name: string;
  lastLogin: number;
  email: string;
}

export {
  DebtAccount,
  PayPeriodDetail,
  PaymentDetail,
  AccountPayoffDetail,
  PlotlyTrace,
  PaydownDataDetail,
  UserProfileDetail
};
