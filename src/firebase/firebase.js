import * as firebase from "firebase";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "firebase/config";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const database = firebase.database();
firebase.analytics();

export { firebase, googleAuthProvider, database as default };
