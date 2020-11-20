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
      <NavBarItem icon="logout" path="/logout" />
    </div>
  </nav>
</template>

<script>
import NavBarItem from "./NavBarItem";

export default {
  components: {
    NavBarItem,
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.upper-section {
  margin-top: calc(30 / 16) rem;
}
.lower-section {
  margin-bottom: calc(30 / 16) rem;
}
</style>
