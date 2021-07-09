// import { createAccount } from "@/models/CreateAccount";
import { DebtAccount } from "@/interfaces";

const accountConverter = {
  toFirestore: function(account: DebtAccount) {
    return {
      name: account.name,
      balance: account.balance,
      dateOpened: account.dateOpened.getTime(),
      apr: account.apr,
      minPayment: account.minPayment,
      provider: account.provider,
      uid: account.uid,
      id: account.id
    };
  },
  fromFirestore: function(snapshot: any, options: any) {
    const data = snapshot.data(options);
    // console.log("Account Data from Firebase: ", data);
    data.dateOpened = new Date(data.dateOpened);
    return data;
  }
};

export { accountConverter };
