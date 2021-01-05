const createAccount = ({
  name = "",
  balance = 0,
  dateOpened = "",
  apr = 0,
  minPayment = 0,
  provider = "",
  uid = "",
  id = ""
} = {}) => ({
  name,
  balance,
  dateOpened,
  apr,
  minPayment,
  provider,
  uid,
  id,
  toMap() {
    return {
      name: this.name,
      balance: this.balance,
      dateOpened: this.dateOpened,
      apr: this.apr,
      minPayment: this.minPayment,
      provider: this.provider,
      uid: this.uid
      //id purposefully left out
    };
  }
});

export { createAccount };
