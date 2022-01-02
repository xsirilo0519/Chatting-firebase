import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

const config = {
  "projectId": "chatty-c2e9d",
  "appId": "1:344864761284:web:a9f9683b11517d4355b091",
  "databaseURL": "https://chatty-c2e9d-default-rtdb.firebaseio.com/",
  "storageBucket": "chatty-c2e9d.appspot.com",
  "locationId": "us-central",
  "apiKey": "AIzaSyAwOUlJi3H9zh-xJN1kJLclaoWAx_ZNjcQ",
  "authDomain": "chatty-c2e9d.firebaseapp.com",
  "messagingSenderId": "344864761284",
  "measurementId": "G-T6XFYM668S"
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
