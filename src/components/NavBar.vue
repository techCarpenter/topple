<template>
  <nav class="nav-bar">
    <div class="upper-section">
      <NavBarItem icon="home" path="/" />
      <NavBarItem icon="bank" path="/accounts" />
      <NavBarItem icon="creditcard" path="/payments" />
      <NavBarItem icon="chart" path="/chart" />
    </div>
    <div class="lower-section">
      <NavBarItem icon="account" path="/profile" />
      <NavBarItem icon="settings" path="/settings" />
      <!-- <NavBarItem icon="logout" path="/logout" /> -->
      <button @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import NavBarItem from "./NavBarItem.vue";

export default defineComponent({
  components: {
    NavBarItem
  },
  methods: {
    ...mapActions(["logout"])
  }
});
</script>

<style lang="scss" scoped>
.nav-bar {
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: $nav-bar-width;
  width: $nav-bar-width;
  background-color: $background-color;
}
.upper-section,
.lower-section {
  padding: 0;
  margin: 0;
}
.upper-section {
  margin-top: 1.8rem;
}
.lower-section {
  margin-bottom: 1.8rem;
}
</style>
