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
      <button @click="submitForm">Add</button>
      <button @click="resetForm">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewAccountForm",
  emits: ["submitform", "resetform"],
  data() {
    return {
      account: {
        id: "",
        name: "",
        balance: 0,
        startDate: "",
        apr: 0,
        minPayment: 0,
        provider: ""
      }
    };
  },
  methods: {
    submitForm() {
      this.account.startDate = new Date(this.account.startDate);
      this.$emit("submitform", this.account);
    },
    resetForm() {
      this.account = {
        id: "",
        name: "",
        balance: 0,
        startDate: "",
        apr: 0,
        minPayment: 0,
        provider: ""
      };
      this.$emit("resetform");
    }
  }
};
</script>
