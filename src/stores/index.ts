import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";
import { MUTATIONS, ACTIONS, GETTERS } from "../data";
import * as fb from "../firebase";
import { router } from "../router";
import {
  DebtAccount,
  PaymentDetail,
  PaydownDataDetail,
  UserProfileDetail
} from "@/interfaces";

export interface State {
  userProfile: UserProfileDetail;
  accounts: DebtAccount[];
  payments: PaymentDetail[];
  paydownData: PaydownDataDetail;
}

export const key: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
  state: {
    userProfile: null,
    accounts: [] as DebtAccount[],
    payments: [] as PaymentDetail[],
    paydownData: null
  },
  actions: {
    async [ACTIONS.deleteAccount](ctx, id: string) {
      fb.accountsCollection
        .doc(id)
        .delete()
        .catch(() => {
          console.error("Error deleting account");
        });
      // ctx.commit(MUTATIONS.deleteAccount, id);
    },
    async [ACTIONS.login]({ dispatch }, form) {
      return new Promise((resolve, reject) => {
        // sign user in
        fb.auth
          .signInWithEmailAndPassword(form.email, form.password)
          .then(async ({ user }) => {
            console.log("signInWithEmail (login)");
            await fb.usersCollection
              .doc(user.uid)
              .update({
                lastLogin: Date.now()
              })
              .catch(() => {
                console.error("Couldn't update user in collection after login");
              });

            // fetch user profile and set in state
            dispatch(ACTIONS.fetchUserProfile, user);

            // redirect to dashboard page
            router.push({ name: "DashboardView" });
          })
          .catch(err => {
            var errorCode = err.code;
            var errorMessage = err.message;
            let regex = new RegExp(`auth/`, "gi");
            if (regex.test(errorCode)) {
              resolve(errorMessage);
            } else {
              console.info(errorCode);
              reject(errorMessage);
            }
          });
      });
    },
    async [ACTIONS.signup]({ dispatch }, form) {
      // sign user up
      return new Promise((resolve, reject) => {
        fb.auth
          .createUserWithEmailAndPassword(form.email, form.password)
          .then(async ({ user }) => {
            // create user object in userCollections
            await fb.usersCollection.doc(user.uid).set({
              name: form.name,
              email: form.email,
              lastLogin: Date.now()
            });
            // fetch user profile and set in state
            dispatch(ACTIONS.fetchUserProfile, user);

            // redirect to dashboard
            router.push({
              name: "DashboardView"
            });
          })
          .catch((error: any) => {
            reject(error.message);
          });
      });
    },
    async [ACTIONS.fetchUserProfile]({ commit }, user) {
      await fb.usersCollection
        .doc(user.uid)
        .get()
        .then(userProfile => {
          commit(MUTATIONS.setUserProfile, userProfile.data());
        })
        .catch(err => {
          console.error("Error in fetchUserProfile", err);
        });
    },
    async [ACTIONS.logout]({ commit }) {
      // log user out
      await fb.auth.signOut().then(() => {
        // clear user data from state
        commit(MUTATIONS.setUserProfile, {});

        // redirect to login view
        router.push({
          name: "LoginRegisterView"
        });
      });
    },
    async [ACTIONS.addAccount](ctx, account: DebtAccount) {
      account.uid = fb.auth.currentUser.uid;

      await fb.accountsCollection.add(account);
    },
    async [ACTIONS.updateAccount](ctx, account: DebtAccount) {
      account.uid = fb.auth.currentUser.uid;

      await fb.accountsCollection
        .doc(account.id)
        .set(account)
        .then(() => console.log("Document successfully updated!"))
        .catch(error => console.error("Error updating document: ", error));
    }
  },
  mutations: {
    [MUTATIONS.setUserProfile]: (state, val) => {
      state.userProfile = val;
    },
    [MUTATIONS.setAccounts]: (state, accounts: DebtAccount[]) => {
      // console.log("setAccounts", accounts);
      state.accounts = accounts;
    },
    [MUTATIONS.addAccount]: (state, account: DebtAccount) => {
      state.accounts.push(account);
    },
    [MUTATIONS.updateAccount]: (state, updatedAccount: DebtAccount) => {
      const index = state.accounts.findIndex(
        account => account.id === updatedAccount.id
      );
      if (index < 0) return;
      state.accounts.splice(index, 1, updatedAccount);
    },
    [MUTATIONS.deleteAccount]: (state, id: string) => {
      const index = state.accounts.findIndex(account => account.id === id);
      if (index < 0) return;
      state.accounts.splice(index, 1);
    },
    [MUTATIONS.setPayments]: (state, payments) => {
      state.payments = payments;
    },
    [MUTATIONS.setPaymentData]: (state, paydownData) => {
      state.paydownData = paydownData;
    }
  },
  getters: {
    [GETTERS.getUser]: state => {
      return state.userProfile;
    },
    [GETTERS.getAccounts]: state => {
      return state.accounts;
    },
    [GETTERS.getAccountById]: state => (accountId: String) => {
      const index = state.accounts.findIndex(
        account => account.id === accountId
      );
      if (index < 0) return null;
      return state.accounts[index];
    },
    [GETTERS.getPaydownData]: state => {
      return state.paydownData;
    }
  },
  modules: {}
});

export default store;
