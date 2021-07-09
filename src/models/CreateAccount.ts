import { DebtAccount } from "@/interfaces";

const createAccount = (
  {
    name = "",
    balance = 0,
    dateOpened = new Date(Date.now()),
    apr = 0,
    minPayment = 0,
    provider = "",
    uid = "",
    id = ""
  }: any = {} as DebtAccount
): DebtAccount => ({
  name,
  balance,
  dateOpened,
  apr,
  minPayment,
  provider,
  uid,
  id
});

export { createAccount };
