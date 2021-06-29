<template>
  <aside>
    <div class="flex flex-col items-center" v-if="!newAccount">
      <AccountList />
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
        @resetform="newAccount = false"
        @submitform="newAccount = false"
      />
    </div>
  </aside>
</template>

<script>
import AccountList from "./AccountList";
import NewAccountForm from "./NewAccountForm";

export default {
  name: "AccountSidebar",
  data() {
    return {
      newAccount: false
    };
  },
  components: {
    AccountList,
    NewAccountForm
  }
};
</script>

<style></style>
