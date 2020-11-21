<template>
  <!-- <nav class="nav__container">
    <div>
      <span class="nav__link-container">
        <router-link to="/">
          <strong>Home</strong>
        </router-link>
      </span>
    </div>
    <div>
      <span class="nav__link-container">
        <router-link to="/accounts">
          <strong>Accounts</strong>
        </router-link>
      </span>
      <span class="nav__link-container">
        <router-link to="/dashboard">
          <strong>Dashboard</strong>
        </router-link>
      </span>
    </div>
  </nav> -->
  <NavBar />
  <router-view />
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  components: { NavBar },
  name: "App",
};
</script>

<style scoped>
.nav__container {
  background-color: lightgreen;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: auto;
  padding: 0.5rem;
  position: relative;
  width: 100vw;
}
.nav__link-container {
  padding: 0.5rem;
}
.nav__link-container a {
  text-decoration: none;
}
</style>
