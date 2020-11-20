<template>
  <AccountList />
  <button @click="addLoan">Add Loan</button>
  <button @click="loadAccounts">Load Existing</button>
</template>

<script>
import { mapActions } from "vuex";
import AccountList from "../../src/components/AccountList";

export default {
  name: "AccountsView",
  components: {
    AccountList
  },
  methods: {
    ...mapActions(["loadAccounts"]),
    addLoan() {
      this.$store.dispatch("addAccount", {
        id: this.$store.getters.getAccounts.length + 1,
        name: "Added loan",
        balance: 5000,
        apr: 4.3,
        minPayment: 100,
        startDate: new Date("2018-11-01T00:00:00"),
        priority: 0
      });
    }
  }
};
</script>
