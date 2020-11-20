<template>
  <form @submit.prevent="submitForm()">
    <div>
      <label for="account-name">Name</label>
      <input id="account-name" v-model="account.name" />
    </div>
    <div>
      <label for="account-balance">Balance</label>
      <input
        id="account-balance"
        v-model.number="account.balance"
        type="number"
        step="0.01"
      />
    </div>
    <div>
      <label for="account-apr">APR</label>
      <input id="account-apr" v-model.number="account.apr" />
    </div>
    <div>
      <label for="account-minpayment">Minimum Payment</label>
      <input
        id="account-minpayment"
        v-model.number="account.minPayment"
        type="number"
        step="0.01"
      />
    </div>
    <div>
      <label for="account-startdate">Date Opened</label>
      <input id="account-startdate" v-model="account.startDate" type="date" />
    </div>
    <button type="submit">Create</button>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "NewAccountForm",
  emits: ["form-submitted"],
  data() {
    return {
      account: {
        name: "",
        balance: 0,
        apr: 0,
        minPayment: 0,
        startDate: "",
        priority: 0
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
    }
  },
  computed: {
    computedDate() {
      console.log(this.formDate);
      return this.formDate;
    }
  }
};
</script>
