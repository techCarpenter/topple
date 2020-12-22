export const PAYDOWN_METHODS = {
  AVALANCHE: "AVALANCHE",
  SNOWBALL: "SNOWBALL",
  MIN_PAYMENTS: "MIN_PAYMENTS",
  CUSTOM: "CUSTOM"
};
export const MUTATIONS = {
  setAccounts: "setAccounts",
  setUserProfile: "setUserProfile",
  createAccount: "createAccount",
  updateAccount: "updateAccount",
  deleteAccount: "deleteAccount",
  setPayments: "setPayments"
};

export const ACTIONS = {
  login: "login",
  logout: "logout",
  signup: "signup",
  fetchUserProfile: "fetchUserProfile",
  createAccount: "createAccount"
};

export default {
  PAYDOWN_METHODS,
  MUTATIONS,
  ACTIONS
};
