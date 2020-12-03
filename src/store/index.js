import { createStore } from "vuex";
import { MUTATIONS } from "../consts";
import { accounts } from "../accounts";
import { v4 as uuidv4 } from "uuid";
export default createStore({
  state: {
    user: null,
    loggedIn: true, //TODO: Change to false for production!!!
    accounts: []
  },
  actions: {
    loginUser: ctx => {
      //TODO: replace with oAuth
      console.log("logging in user");
      ctx.commit(MUTATIONS.loginUser);
    },
    loadAccounts: ctx => {
      console.log("loading accounts", accounts);
      //TODO: replace with firestore fetch
      ctx.commit(MUTATIONS.fetchAccounts, accounts);
    },
    addAccount: (context, account) => {
      account.id = uuidv4();
      console.log(uuidv4().toString());
      console.log("DEBUG: adding account", account);
      context.commit(MUTATIONS.createAccount, account);
      //TODO: add firestore write
    },
    deleteAccount: (context, id) => {
      context.commit(MUTATIONS.deleteAccount, id);
      //TODO: add firestore delete
    }
  },
  mutations: {
    [MUTATIONS.fetchAccounts]: (state, accounts) => {
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
    [MUTATIONS.loginUser]: state => {
      state.loggedIn = true;
    }
  },
  getters: {
    getLoggedIn: state => {
      return state.loggedIn;
    },
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
