import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";
import { MUTATIONS, ACTIONS } from "../data";
import * as fb from "../firebase";
import { router } from "../router";
import { DebtAccount, PaymentDetail } from "@/interfaces";

export interface State {
  userProfile: Object;
  accounts: DebtAccount[];
  payments: PaymentDetail[];
}

export const key: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
  state: {
    userProfile: {},
    accounts: [] as DebtAccount[],
    payments: [] as PaymentDetail[]
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
        console.log("form", form);
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
      await fb.auth
        .createUserWithEmailAndPassword(form.email, form.password)
        .then(async ({ user }) => {
          // create user object in userCollections
          await fb.usersCollection.doc(user.uid).set({
            name: form.name,
            lastLogin: Date.now()
          });
          dispatch(ACTIONS.fetchUserProfile, user);
        })
        .catch(() => {
          console.error("Error creating user object in signup");
        });

      // fetch user profile and set in state
    },
    async [ACTIONS.fetchUserProfile]({ commit }, user) {
      // fetch user profile
      // const userProfile =
      await fb.usersCollection
        .doc(user.uid)
        .get()
        .then(userProfile => {
          // console.log("fetchUserProfile", userProfile.data());
          // set user profile in state
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
    /**
     * Action to create a new account in the database
     * @param {*} ctx
     * @param {Object} account The loan account to create
     */
    async [ACTIONS.addAccount](ctx, account: DebtAccount) {
      account.uid = fb.auth.currentUser.uid;

      await fb.accountsCollection.add(account);
    },
    /**
     * Action to update an account in the database
     * @param {*} ctx
     * @param {Object} account The loan account to update
     */
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
    }
  },
  getters: {
    getUser: state => {
      return state.userProfile;
    },
    getAccounts: state => {
      return state.accounts;
    },
    getAccountById: state => (accountId: String) => {
      const index = state.accounts.findIndex(
        account => account.id === accountId
      );
      if (index < 0) return null;
      return state.accounts[index];
    }
  },
  modules: {}
});

export default store;
