import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBamw9FNWuU50jJmdlfyaTABhvDFcNM-pg",
  authDomain: "operation-financial-freedom.firebaseapp.com",
  databaseURL: "https://operation-financial-freedom.firebaseio.com",
  projectId: "operation-financial-freedom",
  storageBucket: "operation-financial-freedom.appspot.com",
  messagingSenderId: "688424335183",
  appId: "1:688424335183:web:62ab37909427685f62373a",
  measurementId: "G-FDZ1584ZKW"
};
firebase.initializeApp(firebaseConfig);

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
