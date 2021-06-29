<template>
  <div class="flex flex-col w-full" v-if="accounts.length > 0">
    <AccountItem v-for="loan in this.accounts" :key="loan.id" :account="loan" />
  </div>
</template>

<script>
import AccountItem from "./AccountItem";

export default {
  name: "AccountList",
  computed: {
    accounts() {
      return this.$store.getters.getAccounts || [];
    }
  },
  components: {
    AccountItem
  }
};
</script>
