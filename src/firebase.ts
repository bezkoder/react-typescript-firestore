import firebase from "firebase/app";
import "firebase/firestore";

let config = {
  apiKey: "xxx",
  authDomain: "bezkoder-firebase.firebaseapp.com",
  databaseURL: "https://bezkoder-firebase.firebaseio.com",
  projectId: "bezkoder-firebase",
  storageBucket: "bezkoder-firebase.appspot.com",
  messagingSenderId: "xxx",
  appId: "xxx",
};

firebase.initializeApp(config);

export default firebase.firestore();
