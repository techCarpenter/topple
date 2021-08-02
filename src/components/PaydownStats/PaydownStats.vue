<template>
  <div>
    <h1 class="mt-4 text-2xl">Current Stats</h1>
    <div
      class="my-3 flex flex-wrap justify-between"
      v-if="paydownData !== undefined && paydownData !== null"
    >
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
      <PaydownStatBlock
        title="Final Snowball"
        :value="currencyFormat(paydownData.finalSnowball)"
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
import { DebtAccount, PaymentDetail, PayPeriodDetail } from "@/interfaces";
import { PAYDOWN_METHODS } from "@/data";

export default defineComponent({
  name: "PaydownStats",
  components: { PaydownStatBlock },
  setup() {
    const store = useStore(key);

    const accounts = computed(() => store.state.accounts);
    const paydownData = computed(() => store.state.paydownData);

    const dateFormat = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long"
    }).format;

    const minPaymentData = computed(() =>
      getTotalPaymentData(accounts.value, PAYDOWN_METHODS.minPayments)
    );

    const startingBalance = computed(() =>
      store.state.accounts
        .map((acct: DebtAccount) => acct.balance)
        .reduce((acc, cur) => acc + cur)
    );

    const paymentsBeforeToday = (pmt: PayPeriodDetail) => {
      let now = new Date();
      return (
        pmt.date.getFullYear() < now.getFullYear() ||
        (pmt.date.getMonth() < now.getMonth() &&
          pmt.date.getFullYear() === now.getFullYear())
      );
    };

    const paid = computed(() => {
      try {
        return store.state.paydownData.paymentArray
          .filter(paymentsBeforeToday)
          .map((pmt: PayPeriodDetail) => {
            return pmt.payments.map(
              (payment: PaymentDetail) => payment.totalPaid
            );
          })
          .flat()
          .reduce((acc: number, cur: number) => acc + cur);
      } catch {
        return 0;
      }
    });

    const monthDiff = (dateFrom: Date, dateTo: Date) => {
      return (
        dateTo.getMonth() -
        dateFrom.getMonth() +
        12 * (dateTo.getFullYear() - dateFrom.getFullYear())
      );
    };

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

      return paydownData.value.paymentArray
        .filter(
          (pmt: PayPeriodDetail) =>
            pmt.date.getFullYear() === curYear &&
            pmt.date.getMonth() === curMonth
        )[0]
        .payments.map((pmt) => pmt.balance)
        .reduce((acc: number, cur: number) => acc + cur);
    });

    const progress = computed(() => {
      return ((paid.value / paydownData.value.totalPaid) * 100).toLocaleString(
        "en-US",
        {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1
        }
      );
    });

    const totalSaved = computed(() => {
      return minPaymentData.value.totalPaid - paydownData.value.totalPaid;
    });

    return {
      totalSaved,
      currentBalance,
      // savedNow,
      accounts,
      paydownData,
      paid,
      startingBalance,
      progress,
      dateFormat,
      dateStringFromDate,
      currencyFormat,
      percentFormat
    };
  }
});
</script>

<style></style>
