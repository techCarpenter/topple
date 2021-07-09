import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { accountConverter } from "./converters";

// firebase init
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

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const accountsCollection = db
  .collection("accounts")
  .withConverter(accountConverter);
const paymentsCollection = db.collection("payments");
// const plansCollection = db.collection("plans");

export { db, auth, usersCollection, accountsCollection, paymentsCollection };
