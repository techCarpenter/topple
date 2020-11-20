<template>
  <div>
    <p>{{ loan.name }}</p>
    <p>{{ loan.balance }}</p>
    <button @click="deleteAccount(loan.id)">Delete Account</button>
  </div>
</template>

<script>
export default {
  name: "AccountItem",
  props: {
    loan: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteAccount(id) {
      this.$store.dispatch("deleteAccount", id);
    }
  }
};
</script>
