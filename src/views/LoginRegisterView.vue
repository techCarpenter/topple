<template>
  <h1>Login/Register page</h1>
  <section id="firebaseui-auth-container"></section>
</template>

<script>
import { mapActions } from "vuex";
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  name: "LoginRegisterView",
  methods: {
    ...mapActions(["loginUser"])
  },
  mounted() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    let uiConfig = {
      signInSuccessUrl: "#/dashboard",
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  }
};
</script>
