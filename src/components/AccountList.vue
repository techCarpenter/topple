<template>
  <div class="flex flex-col w-full" v-if="accounts.length > 0">
    <AccountItem
      v-for="loan in accounts.sort((a, b) => a.name > b.name)"
      :key="loan.id"
      :account="loan"
      :selected="loan.id === selectedId"
      @delete="handleDelete"
      @update="handleUpdate"
    />
    <!-- @clicked="selectedId = loan.id" -->
  </div>
</template>

<script lang="ts">
import AccountItem from "./AccountItem.vue";
import { ACTIONS, GETTERS } from "../data";
import { mapActions, mapGetters } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
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
    handleDelete(id: string) {
      let curAccount = this[GETTERS.getAccountById]()(id);
      if (
        confirm(`Are you sure you want to delete account "${curAccount.name}"?`)
      ) {
        this[ACTIONS.deleteAccount](id);
      } else {
        console.info(`Account "${curAccount.name}" was not deleted.`);
      }
    },
    handleUpdate(id: string) {
      this.$emit("updateaccount", id);
    }
  },
  components: {
    AccountItem
  }
});
</script>
