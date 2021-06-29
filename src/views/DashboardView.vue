<template>
  <div class="max-w-lg m-auto">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl">⛰️ Topple</h1>
      <button
        class="
          button
          py-1
          px-2
          cursor-pointer
          button
          border-gray-200 border-solid border-2
          hover:text-green-500
          focus:text-green-500
          active:text-green-500
          hover:bg-gray-800
          focus:bg-gray-800
          active:bg-gray-600
          hover:border-green-400
          focus:border-green-400
          active:border-green-600
        "
        @click="logout"
      >
        Log out
        <svg
          class="inline-block fill-current"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z"
          />
        </svg>
      </button>
    </div>
    <div class="flex flex-col w-full">
      <h1 class="mt-4 text-2xl">Accounts</h1>
      <AccountSidebar class="mt-2" />
      <h1 class="text-2xl mt-8">Paydown Chart</h1>
      <div
        v-if="accounts.length > 0"
        class="mt-2 items-center flex flex-col flex-auto"
      >
        <ReactiveChart :chart="chart" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { ACTIONS } from "../data";
import AccountSidebar from "../components/AccountSidebar";
import ReactiveChart from "../components/ReactiveChart.vue";
import { plotlyConfig } from "../data";

export default {
  name: "DashboardView",
  data() {
    return {
      chart: plotlyConfig
    };
  },
  components: {
    AccountSidebar,
    ReactiveChart
  },
  methods: {
    ...mapActions([ACTIONS.logout])
  },
  computed: {
    ...mapState(["accounts"])
  }
};
</script>

<style></style>
