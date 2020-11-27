<template>
  <!-- Account List -->
  <div class="flex">
    <div class="w-80">
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
      <div class="flex flex-col mt-2 p-5 shadow-container">
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
        <button
          class="w-32 flex flex-row self-center justify-center content-center border-white border-2 p-2 mt-3 uppercase"
        >
          <svg class="inline-block" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
            /></svg
          >Add loan
        </button>
      </div>
    </div>
    <div class="flex-grow ml-12">
      <div class="text-xl">Details</div>
      <div class="flex flex-row mt-2 p-5 shadow-container">
        <div class="max-w-xs w-36 flex-grow">
          <div class="flex flex-row justify-between">
            <div class="text-2xl">Discover</div>
            <button>
              <svg width="30" height="30" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z"
                />
              </svg>
              <!-- Edit button -->
            </button>
          </div>
          <div class="flex flex-row justify-between mt-3">
            <div>Starting Balance:</div>
            <div>$16,500.00</div>
          </div>
          <div class="flex flex-row justify-between mt-2">
            <div>Current Balance:</div>
            <div>$14,243.45</div>
          </div>
          <div class="flex flex-row justify-between mt-2">
            <div>Minimum Payment:</div>
            <div>$189.00</div>
          </div>
          <div class="flex flex-row justify-between mt-2">
            <div>Interest Rate:</div>
            <div>4.5%</div>
          </div>
          <div class="flex flex-row justify-between mt-2">
            <div>Date Opened:</div>
            <div>08/17/2013</div>
          </div>
          <hr class="border-t-2 mt-3" />
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
  border: 2px solid #f8f8f8;
}
</style>