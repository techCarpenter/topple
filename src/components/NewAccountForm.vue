<template>
  <form
    @submit.prevent="submitForm"
    @reset.prevent="resetForm"
    class="flex flex-col"
  >
    <div class="my-1 flex flex-col">
      <label class="text-lg" for="account-name">Name</label>
      <input
        id="account-name"
        class="
          w-full
          px-1
          text-gray-900
          border-solid border-2 border-white
          focus:border-green-400
        "
        required
        type="text"
        v-model="account.name"
      />
    </div>
    <div class="my-1 flex flex-col">
      <label class="text-lg" for="account-provider">Provider</label>
      <input
        id="account-provider"
        class="
          w-full
          px-1
          text-gray-900
          border-solid border-2 border-white
          focus:border-green-400
        "
        type="text"
        v-model="account.provider"
      />
    </div>
    <div class="my-1 flex flex-col">
      <label class="text-lg" for="account-balance">Balance</label>
      <input
        id="account-balance"
        class="
          w-full
          px-1
          text-gray-900
          border-solid border-2 border-white
          focus:border-green-400
        "
        v-model.number="account.balance"
        type="number"
        min="0"
        required
        step="0.01"
      />
    </div>
    <div class="my-1 flex flex-col">
      <label class="text-lg" for="account-apr">Interest Rate</label>
      <input
        id="account-apr"
        class="
          w-full
          px-1
          text-gray-900
          border-solid border-2 border-white
          focus:border-green-400
        "
        type="number"
        min="0"
        required
        v-model.number="account.apr"
        step="0.01"
      />
    </div>
    <div class="my-1 flex flex-col">
      <label class="text-lg" for="account-minpayment">Minimum Payment</label>
      <input
        id="account-minpayment"
        class="
          w-full
          px-1
          text-gray-900
          border-solid border-2 border-white
          focus:border-green-400
        "
        v-model.number="account.minPayment"
        type="number"
        required
        min="0"
        step="0.01"
      />
    </div>
    <div class="my-1 flex flex-col">
      <label class="text-lg" for="account-dateOpened">Date Opened</label>
      <input
        id="account-dateOpened"
        class="
          w-full
          px-1
          text-gray-900
          border-solid border-2 border-white
          focus:border-green-400
        "
        required
        v-model="account.dateOpened"
        type="date"
      />
    </div>
    <div class="my-2">
      <button class="button primary px-2 py-1 text-lg" type="submit">
        {{ accountId === "" ? "Create" : "Save" }}
      </button>
      <button
        class="
          button
          py-1
          px-2
          ml-3
          cursor-pointer
          text-lg
          button
          border-gray-200 border-solid border-2
        "
        type="reset"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.button.primary {
  background-color: $theme-color;
  color: white;
}
</style>

<script>
import { createAccount } from "../models";
import { dateFromString } from "../assets/js/functions";
import { mapGetters } from "vuex";
import { GETTERS } from "../data";

export default {
  name: "NewAccountForm",
  emits: ["submitform", "resetform"],
  props: {
    accountId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      account: {}
    };
  },
  methods: {
    ...mapGetters([GETTERS.getAccountById]),
    submitForm() {
      this.account.dateOpened = dateFromString(this.account.dateOpened);
      this.$emit("submitform", this.account);
    },
    resetForm() {
      this.account = {};
      this.$emit("resetform");
    }
  },
  mounted() {
    this.account =
      this.accountId !== ""
        ? createAccount(this[GETTERS.getAccountById]()(this.accountId))
        : createAccount();
  }
};
</script>
