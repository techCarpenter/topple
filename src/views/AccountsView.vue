<template>
  <!-- Account List -->
  <div class="flex">
    <div class="w-80 p-5">
      <div class="flex justify-between">
        <div class="text-xl">Accounts</div>
        <button>
          <svg width="30" height="30" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
            />
          </svg>
        </button>
      </div>
      <div
        class="flex flex-col mt-2 p-5 border-2 border-white shadow-container"
      >
        <div
          class="flex flex-row justify-between border-white border-2 p-5 pt-2"
        >
          <div>Discover</div>
          <div>$14,243.45</div>
        </div>
        <div
          class="flex flex-row justify-between border-white border-2 p-5 pt-2 mt-3"
        >
          <div>Perkins</div>
          <div>$1,124.53</div>
        </div>
        <div
          class="flex flex-row justify-between border-white border-2 p-5 pt-2 mt-3"
        >
          <div>Nelnet (G)</div>
          <div>$3,498.30</div>
        </div>
        <button class="border-white border-2 px-4 py-2 mt-3 hover:bg-gray-900">
          ADD LOAN
        </button>
      </div>
    </div>
    <div>
      <div>Details</div>
      <div>
        <div>
          <div>
            <div>Discover</div>
            <button><!-- Edit button --></button>
          </div>
          <div>
            <div>Starting Balance</div>
            <div>$16,500.00</div>
          </div>
          <div>
            <div>Current Balance</div>
            <div>$14,243.45</div>
          </div>
          <div>
            <div>Minimum Payment</div>
            <div>$189.00</div>
          </div>
          <div>
            <div>Interest Rate</div>
            <div>4.5%</div>
          </div>
          <div>
            <div>Date Opened</div>
            <div>08/17/2013</div>
          </div>
        </div>
        <div>
          <div>Payments</div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <AccountList />
  <button @click="addLoan">Add Loan</button>
  <button @click="loadAccounts">Load Existing</button> -->
</template>

<script>
import { mapActions } from "vuex";
// import AccountList from "../../src/components/AccountList";

export default {
  name: "AccountsView",
  components: {
    // AccountList
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

<style>
.shadow-container {
  box-shadow: 6px 6px #f8f8f8;
}
</style>