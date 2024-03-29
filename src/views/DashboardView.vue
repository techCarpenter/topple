<template>
  <div class="max-w-lg m-auto">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl">
        <img class="pr-2 inline-block" src="/images/favicon-32x32.png" />Topple
      </h1>
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
      <div v-if="accounts && accounts.length > 0">
        <PaydownStats />
        <hr class="border-t-2 my-8" />
        <h1 class="text-2xl mt-8">Paydown Chart</h1>
        <div
          v-if="accounts.length > 0"
          class="mt-2 items-center flex flex-col flex-auto"
        >
          <ReactiveChart v-if="chartConfig !== null" :chart="chartConfig" />
        </div>
        <hr class="border-t-2 my-8" />
      </div>
      <h1 class="mt-4 text-2xl">Accounts</h1>
      <div class="my-4" v-if="!accounts || accounts.length === 0">
        <p>Please add an account.</p>
      </div>
      <AccountSidebar class="mt-4" />
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters, useStore } from "vuex";
import { ACTIONS, GETTERS, MUTATIONS, PAYDOWN_METHODS } from "../data";
import AccountSidebar from "../components/AccountSidebar.vue";
import ReactiveChart from "../components/ReactiveChart.vue";
import PaydownStats from "../components/PaydownStats/PaydownStats.vue";
import { plotlyConfig, CreateTrace } from "../data";
import { getTotalPaymentData } from "../assets/js/paydownData";
import { computed, defineComponent, onMounted, reactive, watch } from "vue";
import { PaymentDetail, PayPeriodDetail, DebtAccount } from "../interfaces";
import { key } from "@/store";

export default defineComponent({
  name: "DashboardView",
  setup() {
    let store = useStore(key),
      chartConfig: any = reactive(plotlyConfig);

    // set vertical line x coordinates
    chartConfig.layout.shapes[0].x0 = new Date();
    chartConfig.layout.shapes[0].x1 = new Date();

    const accounts = computed(() => store.state.accounts);

    const user = computed(() => store.state.userProfile);

    const updateChart = (accounts: DebtAccount[]) => {
      let paymentData;
      if (accounts && accounts !== null && accounts.length > 0) {
        try {
          paymentData = getTotalPaymentData(accounts, PAYDOWN_METHODS.snowball);

          store.commit(MUTATIONS.setPaymentData, paymentData);

          let xTrace = paymentData.paymentArray.map((x: any) => x.date);
          let traces = [];

          for (let i = 0; i < accounts.length; i++) {
            traces.push(
              CreateTrace({
                y: paymentData.paymentArray.map(
                  (payPeriod: PayPeriodDetail) => {
                    let paymentInfo = payPeriod.payments.filter(
                      (payment: PaymentDetail) =>
                        payment.loanID === accounts[i].id
                    );
                    if (paymentInfo.length > 0) {
                      return paymentInfo[0].balance;
                    } else {
                      return null;
                    }
                  }
                ),
                x: xTrace,
                name: accounts[i].name
              })
            );
          }

          chartConfig.traces = traces;
          chartConfig.layout.datarevision = Date.now();
        } catch (err) {
          console.error("Error updating chart:", err);
        }
      }
    };

    onMounted(() => updateChart(store.getters[GETTERS.getAccounts]));

    const unwatch = watch(
      () => store.state.accounts,
      (newAccounts: DebtAccount[], oldAccounts: DebtAccount[]) => {
        updateChart(newAccounts);
      }
    );

    return {
      user,
      accounts,
      unwatch,
      chartConfig
    };
  },
  components: {
    AccountSidebar,
    ReactiveChart,
    PaydownStats
  },
  methods: {
    ...mapActions([ACTIONS.logout]),
    ...mapGetters([GETTERS.getAccounts])
  }
});
</script>

<style></style>
