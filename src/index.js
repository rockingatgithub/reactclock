import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";

const firebaseConfig = {
  apiKey: "AIzaSyDzy9IVKFTvw7WEPn0NFWThWRMKl2gtMM4",
  authDomain: "reactclockbysinghz.firebaseapp.com",
  databaseURL: "https://reactclockbysinghz.firebaseio.com",
  projectId: "reactclockbysinghz",
  storageBucket: "reactclockbysinghz.appspot.com",
  messagingSenderId: "419312093047",
  appId: "1:419312093047:web:291685137d4231f2a10372",
  measurementId: "G-VW0R76VE2E",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(<App />, document.getElementById("root"));
