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
