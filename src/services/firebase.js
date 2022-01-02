import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const config = {
  apiKey: "AIzaSyCuMqQytS4QmA_oN3o43QRapTkENcR-t4c",
  authDomain: "chatty-efe1e.firebaseapp.com",
  projectId: "chatty-efe1e",
  storageBucket: "chatty-efe1e.appspot.com",
  messagingSenderId: "155558959380",
  appId: "1:155558959380:web:00589798b0a3154cebca01",
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
