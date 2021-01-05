<template>
  <div class="my-4 flex flex-col">
    <div class="my-1">
      <label for="account-name">Name</label>
      <input
        class="bg-gray-200 text-gray-800 px-2 ml-2"
        id="account-name"
        v-model="account.name"
      />
    </div>
    <div class="my-1">
      <label for="account-provider">Provider</label>
      <input
        class="bg-gray-200 text-gray-800 px-2 ml-2"
        id="account-provider"
        v-model="account.provider"
      />
    </div>
    <div class="my-1">
      <label for="account-balance">Balance</label>
      <input
        class="bg-gray-200 text-gray-800 px-2 ml-2"
        id="account-balance"
        v-model.number="account.balance"
        type="number"
        step="0.01"
      />
    </div>
    <div class="my-1">
      <label for="account-apr">Interest Rate</label>
      <input
        class="bg-gray-200 text-gray-800 px-2 ml-2"
        id="account-apr"
        v-model.number="account.apr"
      />
    </div>
    <div class="my-1">
      <label for="account-minpayment">Minimum Payment</label>
      <input
        class="bg-gray-200 text-gray-800 px-2 ml-2"
        id="account-minpayment"
        v-model.number="account.minPayment"
        type="number"
        step="0.01"
      />
    </div>
    <div class="my-1">
      <label for="account-dateOpened">Date Opened</label>
      <input
        class="bg-gray-200 text-gray-800 px-2 ml-2"
        id="account-dateOpened"
        v-model="account.dateOpened"
        type="date"
      />
    </div>
    <div class="my-1">
      <button @click="submitForm">Add</button>
      <button @click="resetForm">Cancel</button>
    </div>
  </div>
</template>

<script>
import { createAccount } from "../models";
import { dateFromString } from "../assets/js/functions";

export default {
  name: "NewAccountForm",
  emits: ["submitform", "resetform"],
  data() {
    return {
      account: createAccount()
    };
  },
  methods: {
    submitForm() {
      this.account.dateOpened = dateFromString(this.account.dateOpened);
      this.$emit("submitform", this.account);
    },
    resetForm() {
      this.account = createAccount();
      this.$emit("resetform");
    }
  }
};
</script>
