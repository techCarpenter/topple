import { createStore } from "vuex";
import { MUTATIONS } from "@/data";
import * as fb from "../firebase";
import router from "../router";

//realtime updates
fb.accountsCollection.onSnapshot(snapshot => {
  let accountsArray = [];

  snapshot.forEach(doc => {
    let account = doc.data();
    account.id = doc.id;

    accountsArray.push(account);
  });
  console.log(accountsArray);
  store.commit(MUTATIONS.setAccounts, accountsArray);
});

fb.paymentsCollection.onSnapshot(snapshot => {
  let paymentsArray = [];

  snapshot.forEach(doc => {
    let payment = doc.data();
    payment.id = doc.id;

    paymentsArray.push(payment);
  });

  store.commit(MUTATIONS.setPayments, paymentsArray);
});

// create vuex store
const store = createStore({
  state: {
    userProfile: {},
    accounts: [],
    payments: [],
    plans: []
  },
  actions: {
    async addAccount(ctx, account) {
      ctx.commit(MUTATIONS.createAccount, account);
      // add firebase add
    },
    async deleteAccount(ctx, id) {
      ctx.commit(MUTATIONS.deleteAccount, id);
      // add firebase delete
    },
    async login({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );

      // create user object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        title: form.title
      });

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get();
      console.log(userProfile.data());
      // set user profile in state
      commit(MUTATIONS.setUserProfile, userProfile.data());

      // change route to dashboard
      router.push("/");
    },
    async logout({ commit }) {
      // log user out
      await fb.auth.signOut();

      // clear user data from state
      commit(MUTATIONS.setUserProfile, {});

      // redirect to login view
      router.push({ name: "LoginRegisterView" });
    },
    async createAccount(ctx, account) {
      await fb.accountsCollection.add({
        name: account.name,
        balance: account.balance,
        startDate: new Date().toISOString(),
        apr: account.interestRate,
        minPayment: account.minPayment,
        provider: account.provider,
        userId: fb.auth.currentUser.uid
      });
    }
  },
  mutations: {
    [MUTATIONS.setUserProfile]: (state, val) => {
      state.userProfile = val;
    },
    [MUTATIONS.setAccounts]: (state, accounts) => {
      state.accounts = accounts;
    },
    [MUTATIONS.createAccount]: (state, account) => {
      state.accounts.push(account);
    },
    [MUTATIONS.updateAccount]: (state, updatedAccount) => {
      const index = state.accounts.findIndex(
        account => account.id === updatedAccount.id
      );
      if (index < 0) return;
      state.accounts.splice(index, 1, updatedAccount);
    },
    [MUTATIONS.deleteAccount]: (state, id) => {
      const index = state.accounts.findIndex(account => account.id === id);
      if (index < 0) return;
      state.accounts.splice(index, 1);
    },
    [MUTATIONS.setPayments]: (state, payments) => {
      state.payments = payments;
    }
  },
  getters: {
    getAccounts: state => {
      return state.accounts;
    },
    getAccountById: state => accountId => {
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
