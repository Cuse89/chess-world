import * as firebaseApp from "firebase";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/messaging";
import firebaseConfig, { publicVapidKey } from "firebase/config";

class Firebase {
  constructor() {
    console.log("firebase constructor")
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

  async getUsersFromIds(ids, filterFunc = () => true) {
    const users = [];
    return await this.getFromDatabaseOnce("users", allUsers => {
      Object.keys(ids).forEach(userId => {
        if (filterFunc(userId)) {
          users.push({ ...allUsers[userId], id: userId });
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

  async getNotificationPermission() {
    const messaging = firebaseApp.messaging();
    messaging.usePublicVapidKey(publicVapidKey)
    // Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
    messaging.getToken().then((currentToken) => {
      if (currentToken) {
        console.log({currentToken})
        // sendTokenToServer(currentToken);
        // updateUIForPushEnabled(currentToken);
      } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
        // updateUIForPushPermissionRequired();
        // setTokenSentToServer(false);
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // showToken('Error retrieving Instance ID token. ', err);
      // setTokenSentToServer(false);
    });
  }
}

const firebase = new Firebase();
export default firebase;
