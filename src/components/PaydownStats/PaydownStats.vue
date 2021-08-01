<template>
  <div>
    <h2 class="mt-4 text-2xl">Stats</h2>
    <div
      class="my-3 flex flex-wrap justify-between"
      v-if="paydownData !== undefined && paydownData !== null"
    >
      <PaydownStatBlock
        title="Starting Balance"
        :value="currencyFormat(startingBalance)"
      />
      <PaydownStatBlock
        title="Time Remaining"
        :value="
          (paydownData.monthsLeft / 12).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }) + ' years'
        "
      />
      <PaydownStatBlock
        title="Debt Free"
        :value="dateFormat(paydownData.endDate)"
      />
      <PaydownStatBlock title="Progress" :value="progress" type="progress" />
      <PaydownStatBlock title="Paid So Far" :value="currencyFormat(paid)" />
      <PaydownStatBlock
        title="Total Paid"
        :value="currencyFormat(paydownData.totalPaid)"
      />
      <PaydownStatBlock
        title="Total Interest Paid"
        :value="currencyFormat(paydownData.totalInterestPaid)"
      />
      <PaydownStatBlock
        title="Current Balance"
        :value="currencyFormat(paydownData.totalPaid - paid)"
      />
      <PaydownStatBlock
        title="Paydown Method"
        :value="paydownData.paydownMethod"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import {
  dateStringFromDate,
  currencyFormat,
  percentFormat
} from "@/assets/js/paydownData";
import PaydownStatBlock from "./PaydownStatBlock.vue";
import { mapState, useStore } from "vuex";
import { key } from "@/store";
import { PayPeriodDetail } from "@/interfaces";

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

    const startingBalance = computed(() =>
      store.state.accounts
        .map((acct) => acct.balance)
        .reduce((acc, cur) => acc + cur)
    );

    const paid = computed(() => {
      try {
        return store.state.paydownData.paymentArray
          .filter((pmt: PayPeriodDetail) => {
            let now = new Date();
            return (
              pmt.date.getFullYear() < now.getFullYear() ||
              (pmt.date.getMonth() <= now.getMonth() &&
                pmt.date.getFullYear() === now.getFullYear())
            );
          })
          .map((pmt: PayPeriodDetail) => {
            return pmt.payments.map((payment) => payment.totalPaid);
          })
          .flat()
          .reduce((acc: number, cur: number) => acc + cur);
      } catch {
        return 0;
      }
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

    return {
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
