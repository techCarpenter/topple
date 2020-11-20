<template>
  <div v-if="loans.length > 0">
    <AccountItem v-for="loan in this.loans" :key="loan.id" :loan="loan" />
  </div>
</template>

<script>
import AccountItem from "./AccountItem";

export default {
  name: "AccountList",
  computed: {
    loans() {
      return this.$store.getters.getAccounts || [];
    }
  },
  components: {
    AccountItem
  }
};
</script>
