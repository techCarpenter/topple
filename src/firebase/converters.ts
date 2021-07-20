import { DebtAccount } from "@/interfaces";
import { createAccount } from "@/models";

const accountConverter: firebase.default.firestore.FirestoreDataConverter<any> = {
  toFirestore(account: DebtAccount) {
    return {
      name: account.name,
      balance: account.balance,
      dateOpened: account.dateOpened.getTime(),
      apr: account.apr,
      minPayment: account.minPayment,
      provider: account.provider,
      uid: account.uid
    };
  },
  fromFirestore(snapshot, options): DebtAccount {
    const data = snapshot.data(options)!;
    data.id = snapshot.id;

    data.dateOpened = new Date(data.dateOpened);
    return createAccount(data);
  }
};

export { accountConverter };
