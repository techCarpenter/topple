const PAYDOWN_METHODS = {
  avalanche: "avalanche",
  snowball: "snowball",
  minPayments: "minPayments",
  custom: "custom"
};
const MUTATIONS = {
  setAccounts: "setAccounts",
  setUserProfile: "setUserProfile",
  addAccount: "addAccount",
  updateAccount: "updateAccount",
  deleteAccount: "deleteAccount",
  setPayments: "setPayments",
  setPaymentData: "setPaymentData"
};

const ACTIONS = {
  login: "login",
  logout: "logout",
  signup: "signup",
  fetchUserProfile: "fetchUserProfile",
  addAccount: "addAccount",
  deleteAccount: "deleteAccount",
  updateAccount: "updateAccount"
};

const GETTERS = {
  getAccounts: "getAccounts",
  getAccountById: "getAccountById",
  getUser: "getUser",
  getPaydownData: "getPaydownData"
};

export { PAYDOWN_METHODS, MUTATIONS, ACTIONS, GETTERS };
