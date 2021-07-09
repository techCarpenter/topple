import { createApp } from "vue";
import { MUTATIONS, ACTIONS } from "./data";
import { createAccount } from "./models";
import AppComp from "./AppComp.vue";
import { router } from "./router";
import store, { key } from "./store";
import * as fb from "./firebase";
import "./assets/tailwind.css";
import { DebtAccount } from "@/interfaces";

let app: any, accountSnapUnsub: Function; // paymentSnapUnsub: Function;

fb.auth.onAuthStateChanged(async user => {
  /**
   * Included in onAuthStateChanged to
   * update view when user logs in or out
   */
  if (!app) {
    app = createApp(AppComp)
      .use(store, key)
      .use(router)
      .mount("#app");
  }

  if (user) {
    console.log("User Found!");

    await store.dispatch(ACTIONS.fetchUserProfile, user);

    accountSnapUnsub = fb.accountsCollection
      .where("uid", "==", user.uid)
      // .withConverter(accountConverter)
      .onSnapshot(
        accountRecords => {
          let accountsArray: DebtAccount[] = [],
            docData,
            account;

          accountRecords.forEach(doc => {
            docData = doc.data();
            docData.id = doc.id;

            account = createAccount(docData);
            accountsArray.push(account);
          });

          store.commit(MUTATIONS.setAccounts, accountsArray);
        },
        error => {
          console.info("Error in account snapshot", error);
        }
      );

    // paymentSnapUnsub = fb.paymentsCollection
    //   .where("uid", "==", user.uid)
    //   .onSnapshot(
    //     paymentRecords => {
    //       let paymentsArray = [];

    //       paymentRecords.forEach(doc => {
    //         let payment = doc.data();
    //         payment.id = doc.id;

    //         paymentsArray.push(payment);
    //       });

    //       store.commit(MUTATIONS.setPayments, paymentsArray);
    //     },
    //     error => {
    //       console.error("Error in payments snapshot", error);
    //     }
    //   );
  }
  //else if no user
  else {
    // Unsusbscribe from firebase collection snapshot listeners
    if (accountSnapUnsub) {
      accountSnapUnsub();
      console.info("Unsubscribed account snapshot");
    }
    // if (paymentSnapUnsub) {
    //   paymentSnapUnsub();
    //   console.info("Unsubscribed payment snapshot");
    // }
  }
});
