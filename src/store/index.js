import { createStore } from "vuex";
import { MUTATIONS } from "../consts";
import { accounts } from "../accounts";
export default createStore({
  state: {
    user: null,
    loggedIn: true, //TODO: Change to false for production!!!
    accounts: []
  },
  actions: {
    loginUser: ctx => {
      console.log("logging in user");
      ctx.commit(MUTATIONS.loginUser);
    },
    loadAccounts: ctx => {
      console.log("loading existing accounts", accounts);
      ctx.commit(MUTATIONS.fetchAccounts, accounts);
    },
    addAccount: (context, account) => {
      console.log("adding account", account);
      context.commit(MUTATIONS.createAccount, account);
    },
    deleteAccount: (context, id) => {
      context.commit(MUTATIONS.deleteAccount, id);
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
      return state.accounts && accountId in state.accounts
        ? state.accounts[accountId]
        : null;
    }
  },
  modules: {}
});
