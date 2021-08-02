<template>
  <div>
    <h1 class="mt-4 text-2xl">Current Stats</h1>
    <div
      class="my-3 flex flex-wrap justify-between"
      v-if="paydownData !== undefined && paydownData !== null"
    >
      <!-- Current Stats -->
      <PaydownStatBlock
        title="Time Remaining"
        :value="
          (paydownData.monthsLeft / 12).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }) + ' years'
        "
      />
      <PaydownStatBlock title="Progress" :value="progress" type="progress" />
      <PaydownStatBlock title="Paid So Far" :value="currencyFormat(paid)" />
      <PaydownStatBlock
        title="Current Balance"
        :value="currencyFormat(currentBalance)"
      />
    </div>
    <h1 class="mt-4 text-2xl">Plan Stats</h1>
    <div
      class="my-3 flex flex-wrap justify-between"
      v-if="paydownData !== undefined && paydownData !== null"
    >
      <!-- Plan Stats -->
      <PaydownStatBlock
        title="Starting Balance"
        :value="currencyFormat(startingBalance)"
      />
      <PaydownStatBlock
        title="DEBT FREE"
        :value="dateFormat(paydownData.endDate)"
      />
      <PaydownStatBlock
        title="Total Paid"
        :value="currencyFormat(paydownData.totalPaid)"
      />
      <PaydownStatBlock
        title="Total Interest Paid"
        :value="currencyFormat(paydownData.totalInterestPaid)"
      />
      <PaydownStatBlock
        title="Paydown Method"
        :value="paydownData.paydownMethod"
      />
      <PaydownStatBlock
        title="Total Saved"
        :value="currencyFormat(totalSaved)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import {
  dateStringFromDate,
  currencyFormat,
  percentFormat,
  getTotalPaymentData
} from "@/assets/js/paydownData";
import PaydownStatBlock from "./PaydownStatBlock.vue";
import { mapState, useStore } from "vuex";
import { key } from "@/store";
import { PaymentDetail, PayPeriodDetail } from "@/interfaces";
import { PAYDOWN_METHODS } from "@/data";

export default defineComponent({
  name: "PaydownStats",
  components: { PaydownStatBlock },
  setup() {
    const store = useStore(key);

    const accounts = computed(() => store.state.accounts);

    const dateFormat = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long"
    }).format;

    const minPaymentData = computed(() =>
      getTotalPaymentData(accounts.value, PAYDOWN_METHODS.minPayments)
    );

    const startingBalance = computed(() =>
      store.state.accounts
        .map((acct) => acct.balance)
        .reduce((acc, cur) => acc + cur)
    );

    const paymentsBeforeToday = (pmt: PayPeriodDetail) => {
      let now = new Date();
      return (
        pmt.date.getFullYear() < now.getFullYear() ||
        (pmt.date.getMonth() <= now.getMonth() &&
          pmt.date.getFullYear() === now.getFullYear())
      );
    };

    const paid = computed(() => {
      try {
        return store.state.paydownData.paymentArray
          .filter(paymentsBeforeToday)
          .map((pmt: PayPeriodDetail) => {
            return pmt.payments.map((payment) => payment.totalPaid);
          })
          .flat()
          .reduce((acc: number, cur: number) => acc + cur);
      } catch {
        return 0;
      }
    });

    // const savedNow = computed(() => {
    //   try {
    //     return minPaymentData.value.paymentArray
    //       .filter(paymentsBeforeToday)
    //       .map((pmt: PayPeriodDetail) => {
    //         return pmt.payments.map((payment) => payment.interestPaid);
    //       })
    //       .flat()
    //       .reduce((acc: number, cur: number) => acc + cur);
    //   } catch {
    //     return 0;
    //   }
    // });

    const currentBalance = computed(() => {
      let curYear = new Date().getFullYear();
      let curMonth = new Date().getMonth();

      return store.state.paydownData.paymentArray
        .filter(
          (pmt: PayPeriodDetail) =>
            pmt.date.getFullYear() === curYear &&
            pmt.date.getMonth() === curMonth
        )[0]
        .payments.reduce((acc: any, cur: PaymentDetail) => ({
          balance: acc.balance + cur.balance
        })).balance;
    });

    const progress = computed(() => {
      return (
        (paid.value / store.state.paydownData.totalPaid) *
        100
      ).toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      });
    });

    const totalSaved = computed(() => {
      return minPaymentData.value.totalPaid - store.state.paydownData.totalPaid;
    });

    return {
      totalSaved,
      currentBalance,
      // savedNow,
      accounts,
      paid,
      startingBalance,
      progress,
      dateFormat,
      dateStringFromDate,
      currencyFormat,
      percentFormat
    };
  },
  computed: {
    ...mapState(["paydownData"])
  }
});
</script>

<style></style>
