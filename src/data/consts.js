export const PAYDOWN_METHODS = {
  avalanche: "avalanche",
  snowball: "snowball",
  minPayments: "minPayments",
  custom: "custom"
};
export const MUTATIONS = {
  setAccounts: "setAccounts",
  setUserProfile: "setUserProfile",
  addAccount: "addAccount",
  updateAccount: "updateAccount",
  deleteAccount: "deleteAccount",
  setPayments: "setPayments"
};

export const ACTIONS = {
  login: "login",
  logout: "logout",
  signup: "signup",
  fetchUserProfile: "fetchUserProfile",
  addAccount: "addAccount",
  deleteAccount: "deleteAccount"
};

export const GETTERS = {
  getAccounts: "getAccounts",
  getAccountById: "getAccountById"
};

export default {
  PAYDOWN_METHODS,
  MUTATIONS,
  ACTIONS,
  GETTERS
};
