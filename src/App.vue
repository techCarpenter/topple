<template>
  <div class="max-w-lg p-4 min-h-screen m-auto">
    <router-view />
    <footer v-if="signedIn" class="my-8 w-full">
      <p class="text-center">
        Made by
        <a class="text-green-500 underline" href="https://brianjdevries.com"
          >Brian DeVries</a
        >
      </p>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { auth } from "../src/firebase";

export default {
  name: "App",
  data() {
    return {
      signedIn: false
    };
  },
  computed: {
    ...mapState(["userProfile"])
  },
  watch: {
    userProfile() {
      this.signedIn = auth.currentUser !== null;
    }
  }
};
</script>

<style></style>
