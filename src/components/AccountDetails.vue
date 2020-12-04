<template>
  <div class="max-w-xs w-36 flex-grow">
    <div class="flex flex-row justify-between mb-3">
      <div class="text-2xl">{{ loan.name }}</div>
      <button class="hover:text-green-500 active:text-green-600">
        <svg class="w-8 h-8" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z"
          />
        </svg>
      </button>
    </div>
    <div class="flex flex-row justify-between mt-2">
      <div>Starting Balance:</div>
      <div>{{ formatCurrency(loan.balance) }}</div>
    </div>
    <div class="flex flex-row justify-between mt-2">
      <div>Current Balance:</div>
      <div>{{ formatCurrency(loan.balance) }}</div>
    </div>
    <div class="flex flex-row justify-between mt-2">
      <div>Minimum Payment:</div>
      <div>{{ formatCurrency(loan.minPayment) }}</div>
    </div>
    <div class="flex flex-row justify-between mt-2">
      <div>Interest Rate:</div>
      <div>{{ loan.apr }}%</div>
    </div>
    <div class="flex flex-row justify-between mt-2">
      <div>Date Opened:</div>
      <div>
        {{ formatDate(loan.startDate) }}
      </div>
    </div>
    <hr class="border-t-2 mt-3" />
  </div>
</template>

<script>
import { currencyFormat } from "../assets/js/functions";

export default {
  props: {
    loan: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatCurrency(value) {
      return currencyFormat(value);
    },
    formatDate(dateValue) {
      return (
        (dateValue.getMonth() + 1).toString() +
        "/" +
        dateValue.getDate().toString() +
        "/" +
        dateValue.getFullYear().toString()
      );
    }
  }
};
</script>
