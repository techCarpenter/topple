const createPayment = ({
  date = "",
  interestPaid = 0,
  principalPaid = 0,
  accountId = "",
  uid = "",
  id = ""
} = {}) => ({
  date,
  interestPaid,
  principalPaid,
  accountId,
  uid,
  id,
  toMap() {
    return {
      date: this.date,
      interestPaid: this.interestPaid,
      principalPaid: this.principalPaid,
      accountId: this.accountId,
      uid: this.uid
      //id purposefully left out
    };
  }
});

export { createPayment };
