import { createStore } from "vuex";
import { MUTATIONS, ACTIONS } from "../data";
import * as fb from "../firebase";
import router from "../router";

// create vuex store
const store = createStore({
  state: {
    userProfile: {},
    accounts: [],
    payments: [],
    plans: []
  },
  actions: {
    async deleteAccount(ctx, id) {
      ctx.commit(MUTATIONS.deleteAccount, id);
      // add firebase delete
    },
    async [ACTIONS.login]({ dispatch }, form) {
      // sign user in
      const { user } = await fb.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );

      await fb.usersCollection.doc(user.uid).update({
        lastLogin: new Date().toISOString()
      });

      // fetch user profile and set in state
      dispatch(ACTIONS.fetchUserProfile, user);
    },
    async [ACTIONS.signup]({ dispatch }, form) {
      // sign user up
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );

      // create user object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        lastLogin: new Date().toISOString()
      });

      // fetch user profile and set in state
      dispatch(ACTIONS.fetchUserProfile, user);
    },
    async [ACTIONS.fetchUserProfile]({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get();
      console.log(userProfile.data());
      // set user profile in state
      commit(MUTATIONS.setUserProfile, userProfile.data());

      // change route to dashboard
      router.push("/");
    },
    async [ACTIONS.logout]({ commit }) {
      // log user out
      await fb.auth.signOut();

      // clear user data from state
      commit(MUTATIONS.setUserProfile, {});

      // redirect to login view
      router.push({ name: "LoginRegisterView" });
    },
    /**
     * Action to create a new account in the database
     * @param {*} ctx
     * @param {Object} account The loan account to create
     */
    async [ACTIONS.addAccount](ctx, account) {
      account.uid = fb.auth.currentUser.uid;

      await fb.accountsCollection.add(account.toMap());
    }
  },
  mutations: {
    [MUTATIONS.setUserProfile]: (state, val) => {
      state.userProfile = val;
    },
    [MUTATIONS.setAccounts]: (state, accounts) => {
      console.log("setAccounts", accounts);
      state.accounts = accounts;
    },
    [MUTATIONS.addAccount]: (state, account) => {
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
