<template>
  <NavBar />
  <div class="view-container max-h-screen min-h-screen">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import NavBar from "./components/NavBar";

export default {
  components: { NavBar },
  name: "App",
  methods: {
    ...mapActions(["loadAccounts"])
  },
  mounted() {
    this.loadAccounts();
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
