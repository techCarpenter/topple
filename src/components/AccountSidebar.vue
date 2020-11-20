<template>
  <aside>
    <div v-if="!newAccount">
      <button class="add-button" @click="newAccount = true">➕</button>
      <AccountList />
    </div>
    <div v-else>
      <NewAccountForm @form-submitted="newAccount = false" />
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

<style scoped>
.add-button {
  height: 2rem;
  width: 2rem;
  background-color: lightskyblue;
  color: white;
  border-radius: 50%;
}
</style>
