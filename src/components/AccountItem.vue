<template>
  <div
    class="flex flex-row justify-between border-2 p-5 px-3 pt-2 mt-3"
    :class="[
      selected
        ? ['border-green-500', 'bg-green-500', 'bg-opacity-25']
        : ['border-white', 'hover:bg-gray-600']
    ]"
  >
    <div>{{ loan.name }}</div>
    <div>{{ formatCurrency(loan.balance) }}</div>
  </div>
</template>

<script>
import { currencyFormat } from "../assets/js/functions";

export default {
  name: "AccountItem",
  props: {
    loan: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    deleteAccount(id) {
      this.$store.dispatch("deleteAccount", id);
    },
    formatCurrency(value) {
      return currencyFormat(value);
    }
  }
};
</script>
