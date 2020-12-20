<template>
  <NavBar v-if="showNav" />
  <div class="view-container max-h-screen min-h-screen">
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import { mapState } from "vuex";

export default {
  components: { NavBar },
  name: "App",
  computed: {
    ...mapState(["userProfile"]),
    showNav() {
      return Object.keys(this.userProfile).length > 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.view-container {
  padding: 50px 70px;
  margin: 0 0 0 $nav-bar-width;
  height: auto;
  width: auto;
}
</style>
