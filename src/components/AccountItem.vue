<template>
  <div
    @click="$emit('clicked')"
    class="flex flex-row justify-between items-center border-2 py-2 px-3 mb-3"
    :class="[
      selected
        ? ['border-green-500', 'bg-green-500', 'bg-opacity-25']
        : ['border-white', 'hover:bg-gray-600']
    ]"
  >
    <div>
      <h2 class="text-lg">{{ account.name }}</h2>
      <p class="text-sm text-gray-400">{{ formatCurrency(account.balance) }}</p>
    </div>
    <div class="flex items-center">
      <button
        class="
          text-gray-100
          hover:text-green-500
          focus:text-green-500
          active:text-green-500
          mr-2
        "
        @click="emitUpdate(account.id)"
      >
        <svg
          style="fill: currentColor"
          width="30"
          height="30"
          viewBox="0 0 24 24"
        >
          <path
            d="M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19C21,20.11 20.1,21 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M16.7,9.35L15.7,10.35L13.65,8.3L14.65,7.3C14.86,7.08 15.21,7.08 15.42,7.3L16.7,8.58C16.92,8.79 16.92,9.14 16.7,9.35M7,14.94L13.06,8.88L15.12,10.94L9.06,17H7V14.94Z"
          />
        </svg>
      </button>
      <button
        class="
          text-gray-100
          hover:text-red-600
          focus:text-red-600
          active:text-red-600
        "
        @click="emitDelete(account.id)"
      >
        <svg
          style="fill: currentColor"
          width="30"
          height="30"
          viewBox="0 0 24 24"
        >
          <path
            d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { currencyFormat } from "../assets/js/functions";
import { ACTIONS } from "../data";

export default {
  name: "AccountItem",
  emits: ["update", "delete", "clicked"],
  props: {
    account: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    emitUpdate(id) {
      this.$emit("update", id);
    },
    emitDelete(id) {
      this.$emit("delete", id);
    },
    formatCurrency(value) {
      return currencyFormat(value);
    }
  }
};
</script>
