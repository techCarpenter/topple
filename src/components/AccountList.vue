<template>
  <div class="flex flex-col w-full" v-if="accounts.length > 0">
    <AccountItem
      v-for="loan in this.accounts"
      :key="loan.id"
      :account="loan"
      :selected="loan.id === selectedId"
      @delete="handleDelete"
      @update="handleUpdate"
    />
    <!-- @clicked="selectedId = loan.id" -->
  </div>
</template>

<script>
import AccountItem from "./AccountItem";
import { ACTIONS, GETTERS } from "../data";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AccountList",
  emits: ["updateaccount"],
  data() {
    return {
      selectedId: ""
    };
  },
  computed: {
    accounts() {
      return this[GETTERS.getAccounts]() || [];
    }
  },
  methods: {
    ...mapGetters([GETTERS.getAccountById, GETTERS.getAccounts]),
    ...mapActions([ACTIONS.deleteAccount]),
    handleDelete(id) {
      let curAccount = this.getAccountById()(id);
      if (
        confirm(`Are you sure you want to delete account "${curAccount.name}"?`)
      ) {
        this[ACTIONS.deleteAccount](id);
      } else {
        console.log(`Account "${curAccount.name}" was not deleted.`);
      }
    },
    handleUpdate(id) {
      this.$emit("updateaccount", id);
    }
  },
  components: {
    AccountItem
  }
};
</script>
