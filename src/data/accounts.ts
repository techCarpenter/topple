import { DebtAccount } from "@/interfaces";

const accounts: DebtAccount[] = [
  {
    id: "00b25df6-3281-4091-b52e-63ec2a86a700",
    name: "Student loan 1",
    provider: "Discover",
    uid: "",
    balance: 16000.29,
    apr: 4.5,
    minPayment: 189,
    dateOpened: new Date("2017-11-01T00:00:00")
  },
  {
    id: "ea8924d6-bb42-4f3c-b806-00cad7d7391a",
    name: "Car loan",
    provider: "Discover",
    uid: "",
    balance: 14583,
    apr: 3.7,
    minPayment: 316,
    dateOpened: new Date("2018-01-28T00:00:00")
  },
  {
    id: "3db67158-a667-4d33-b63f-c6d269678fe5",
    name: "Credit Card",
    provider: "Discover",
    uid: "",
    balance: 5000,
    apr: 19.99,
    minPayment: 316,
    dateOpened: new Date("2018-01-28T00:00:00")
  },
  {
    id: "a5b51f77-dfdf-4137-85f0-8ed0d1f1abef",
    name: "Student loan 2",
    provider: "Discover",
    uid: "",
    balance: 7346.347,
    apr: 20,
    minPayment: 500,
    dateOpened: new Date("2018-11-01T00:00:00")
  }
];

export { accounts };
