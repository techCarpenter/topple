<template>
  <aside>
    <div class="flex flex-col items-center" v-if="!newAccount">
      <AccountList @updateaccount="handleAccountUpdate" />
      <button
        class="
          w-1/3
          min-w-max
          bg-green-500
          text-white
          bold
          text-xl
          py-2
          px-3
          mb-3
          hover:bg-green-400
          active:bg-green-600
          focus:bg-green-400
        "
        @click="newAccount = true"
      >
        Add <span class="text-2xl">+</span>
      </button>
    </div>
    <div v-else>
      <NewAccountForm
        :accountId="formAccountId"
        @resetform="handleFormReset"
        @submitform="handleFormSubmit"
      />
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import { ACTIONS } from "../data";
import { DebtAccount } from "../interfaces";
import AccountList from "./AccountList.vue";
import NewAccountForm from "./NewAccountForm.vue";

export default defineComponent({
  name: "AccountSidebar",
  data() {
    return {
      newAccount: false,
      formAccountId: "",
      editAccount: false
    };
  },
  components: {
    AccountList,
    NewAccountForm
  },
  methods: {
    ...mapActions([ACTIONS.addAccount, ACTIONS.updateAccount]),
    handleFormSubmit(account: DebtAccount) {
      // console.log("account", account);
      if (this.editAccount) {
        // console.log("Update account here...", account);
        this[ACTIONS.updateAccount](account);
      } else {
        this[ACTIONS.addAccount](account);
      }
      this.handleFormReset();
    },
    handleFormReset() {
      this.formAccountId = "";
      this.newAccount = false;
      this.editAccount = false;
    },
    handleAccountUpdate(id: string) {
      this.formAccountId = id;
      this.newAccount = true;
      this.editAccount = true;
    }
  }
});
</script>

<style></style>
