import * as firebaseApp from "firebase";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/messaging";
import firebaseConfig, { publicVapidKey } from "firebase/config";

class Firebase {
  constructor() {
    firebaseApp.initializeApp(firebaseConfig);
    firebaseApp.analytics();
    this.auth = firebaseApp.auth;
    this.database = firebaseApp.database();
    this.messaging = firebaseApp.messaging();
    this.messaging.usePublicVapidKey(publicVapidKey);
  }

  async login() {
    try {
      await this.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (err) {
      console.log(err);
    }
  }

  async logout() {
    try {
      await firebaseApp.auth().signOut();
    } catch (err) {
      console.log(err);
    }
  }

  async updateDatabase(url, value) {
    try {
      await this.database.ref(url).update(value);
    } catch (err) {
      console.log(err);
    }
  }

  async getFromDatabaseOnce(path, callback) {
    try {
      return await this.database
        .ref(path)
        .once("value")
        .then(snapshot => callback(snapshot.val()));
    } catch (err) {
      console.log(err);
    }
  }

  getFromDatabaseListener(path, callback) {
    try {
      this.database
        .ref(path)
        .on("value", async result => callback(result.val()));
    } catch (err) {
      console.log(err);
    }
  }

  listenerUnsubscribe(path) {
    this.database.ref(path).off()
  }

  async setUser(userId, key, value) {
    try {
      await this.database.ref(`users/${userId}/${key}`).set(value);
    } catch (err) {
      console.log(err);
    }
  }

  async updateUser(userId, key, value) {
    try {
      await this.database.ref(`users/${userId}/${key}`).update(value);
    } catch (err) {
      console.log(err);
    }
  }

  async updateGame(gameId, value) {
    await this.database.ref(`games/${gameId}`).update(value);
  }

  async getGameSettings(gameId) {
    return this.database
      .ref(`games/${gameId}/settings`)
      .on("value", snapshot => snapshot.val());
  }
}

const firebase = new Firebase();
export default firebase;
