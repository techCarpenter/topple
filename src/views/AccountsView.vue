<!--<template>
  <div class="flex">
    <div class="flex flex-col w-80 max-h-80vh">
      <div class="flex justify-between">
        <h1 class="text-xl">Accounts</h1>
        <button
          @click="newAccount = true"
          class="hover:text-green-500 active:text-green-600"
        >
          <svg class="w-8 h-8" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
            />
          </svg>
        </button>
      </div>
      <div class="mt-2 shadow-container overflow-hidden overflow-y-scroll">
        <div class="flex flex-col flex-1 p-5 pt-2">
          <AccountItem
            @click="setSelectedAccount(loan.id)"
            v-for="loan in loans"
            :loan="loan"
            :selected="loan.id === selectedAccountId"
            :key="loan.id"
          />
          <button
            @click="newAccount = true"
            class="w-32 flex flex-row self-center justify-center content-center border-white border-2 p-2 mt-3 uppercase hover:text-green-500 hover:border-green-500 active:border-green-600 active:text-green-600"
          >
            <svg class="inline-block w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
              /></svg
            >Add loan
          </button>
        </div>
      </div>
    </div>
    <div class="flex-grow ml-12">
      <div v-if="!newAccount">
        <h1 class="text-xl">Details</h1>
        <div
          v-if="getSelectedAccount() !== null"
          class="flex flex-row mt-2 p-5 pt-3 shadow-container"
        >
          <AccountDetails :loan="getSelectedAccount()" />
        </div>
      </div>
      <div v-else>
        <h1 class="text-xl">New Account</h1>
        <NewAccountForm @form-submitted="setNewAccount(false)" />
      </div>
    </div>
  </div>
</template>-->

<template>
  <new-account-form @form-submitted="newAccount = false" />
  <div>
    <account-item
      v-for="account in accounts"
      :loan="account"
      :key="account.id"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import AccountItem from "../components/AccountItem";
// import AccountDetails from "../components/AccountDetails";
import NewAccountForm from "../components/NewAccountForm";

export default {
  name: "AccountsView",
  data() {
    return {
      selectedAccountId: "",
      newAccount: false
    };
  },
  components: {
    AccountItem,
    NewAccountForm
  },
  methods: {
    ...mapGetters(["getAccountById"]),
    // addLoan() {
    //   let randBalance = Math.random() * 20000;
    //   let randInterest = Math.random() * 5;
    //   this.$store.dispatch("addAccount", {
    //     id: 1, // ID gets overridden in 'addAccount' action
    //     name: "Added loan",
    //     balance: randBalance,
    //     apr: randInterest,
    //     minPayment: randBalance * 0.015,
    //     startDate: new Date("2018-01-01T00:00:00"),
    //     priority: 0
    //   });
    // },
    getSelectedAccount() {
      return this.getAccountById()(this.selectedAccountId);
    },
    setSelectedAccount(id) {
      this.selectedAccountId = id;
    }
  },
  computed: {
    ...mapState(["accounts"])
  },
  mounted() {
    console.log(this.accounts);
    this.setSelectedAccount(
      this.accounts.length > 0 ? this.accounts[0].id : ""
    );
  }
};
</script>

<style lang="scss">
.shadow-container {
  box-shadow: 6px 6px #f8f8f8;
  border: 2px solid #f8f8f8;
  max-height: 75vh;
  min-height: 75vh;
}
.max-h-80vh {
  max-height: 80vh;
}
</style>
