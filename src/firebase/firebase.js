import * as firebaseApp from "firebase";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "firebase/config";

class Firebase {
  constructor() {
    firebaseApp.initializeApp(firebaseConfig);
    firebaseApp.analytics();
    this.auth = firebaseApp.auth;
    this.database = firebaseApp.database();
  }

  login() {
    this.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.auth().signOut();
  }

  setDb() {}

  updateDb() {}

  async setUser(userUid, key, value) {
    await this.database.ref(`users/user-${userUid}/${key}`).set(value);
  }
}

const firebase = new Firebase();
export default firebase;
