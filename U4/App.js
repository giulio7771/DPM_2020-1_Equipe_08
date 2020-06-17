import React from 'react';
import Routes from './src/routes';

const App = () => <Routes />;

import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAzkMJWfDVGzvYS7fr6mNVVzdm2OIP7kpk",
  authDomain: "furb-go.firebaseapp.com",
  databaseURL: "https://furb-go.firebaseio.com",
  projectId: "furb-go",
  storageBucket: "furb-go.appspot.com",
  messagingSenderId: "256833775860",
  appId: "1:256833775860:web:97d23ab86259975de996a1",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase.firestore().collection("characters").doc().set({
//   employment: "plumber",
//   outfitColor: "red",
//   specialAttack: "fireball"
// })

// firebase.storage();

export default App;