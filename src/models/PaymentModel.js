export class PaymentModel {
  constructor({
    date = new Date(),
    interestPaid = 0,
    principalPaid = 0,
    accountId = "",
    uid = ""
  }) {
    this.paymentDate = date;
    this.interestPaid = interestPaid;
    this.principalPaid = principalPaid;
    this.accountId = accountId;
    this.uid = uid;
  }

  toMap() {
    return {
      paymentDate: this.paymentDate,
      interestPaid: this.interestPaid,
      principalPaid: this.principalPaid,
      accountId: this.accountId
    };
  }

  static fromMap(obj, id) {
    return new this({
      accountId: id,
      date: obj.paymentDate,
      interestPaid: obj.interestPaid,
      principalPaid: obj.principalPaid
    });
  }
}
