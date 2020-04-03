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

  async logout() {
    await this.auth().signOut();
  }

  async setUser(userId, key, value) {
    await this.database.ref(`users/${userId}/${key}`).set(value);
  }

  async updateUser(userId, key, value) {
    await this.database.ref(`users/${userId}/${key}`).update(value);
  }

  async getUsersFromIds(ids, filterFunc = () => true) {
    const users = [];
    return await firebase.database
      .ref("users")
      .once("value")
      .then(allUsers => {
        ids.val() &&
          Object.keys(ids.val()).forEach(userId => {
            if (filterFunc(userId)) {
              users.push({ ...allUsers.val()[userId], id: userId });
            }
          });
        return users;
      });
  }

  async updateGame(gameId, value) {
    await this.database.ref(`games/${gameId}`).update(value);
  }

  async getGameSettings(gameId) {
    return firebase.database
      .ref(`games/${gameId}/settings`)
      .on("value", snapshot => snapshot.val());
  }
}

const firebase = new Firebase();
export default firebase;
