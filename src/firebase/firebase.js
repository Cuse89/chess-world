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

  async login() {
    await this.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.auth().signOut();
  }

  async setUser(userId, key, value) {
    await this.database.ref(`users/${userId}/${key}`).set(value);
  }

  async updateUser(userId, key, value) {
    await this.database.ref(`users/${userId}/${key}`).update(value);
  }

  async getUsersFromIds(ids, condition) {
    const users = [];
    return await firebase.database
      .ref("users")
      .once("value")
      .then(allUsers => {
        ids.val() &&
          Object.keys(ids.val()).forEach(userId => {
            if (!condition || condition(userId)) {
              users.push({ ...allUsers.val()[userId], id: userId });
            }
          });
        return users;
      });
  }
}

const firebase = new Firebase();
export default firebase;
