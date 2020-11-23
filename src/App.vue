<template>
  <NavBar />
  <div class="view-container">
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  components: { NavBar },
  name: "App"
};
</script>

<style lang="scss" scoped>
.view-container {
  padding: 50px 70px;
  margin: 0 0 0 $nav-bar-width;
  width: auto;
  height: auto;
}
</style>
