<template>
  <div class="my-4 flex flex-col">
    <div class="my-1">
      <label for="account-name">Name:</label>
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
        v-model.number="account.interestRate"
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
      <label for="account-startdate">Date Opened</label>
      <input
        class="bg-gray-200 text-gray-800 px-2 ml-2"
        id="account-startdate"
        v-model="account.startDate"
        type="date"
      />
    </div>
    <div class="my-1">
      <button @click="submitForm()">Add</button>
      <button @click="resetForm()">Cancel</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "NewAccountForm",
  emits: ["form-submitted"],
  data() {
    return {
      account: {
        id: "",
        name: "",
        balance: 0,
        startDate: "",
        interestRate: 0,
        minPayment: 0,
        provider: ""
      }
    };
  },
  methods: {
    ...mapActions(["addAccount"]),
    submitForm() {
      console.log(this.account.startDate);
      this.account.startDate = new Date(this.account.startDate);
      this.addAccount(this.account);
      this.$emit("form-submitted");
    },
    resetForm() {
      this.$emit("form-submitted");
    }
  }
};
</script>
