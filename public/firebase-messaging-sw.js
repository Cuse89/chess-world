importScripts("https://www.gstatic.com/firebasejs/7.12.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.12.0/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDR2LsF89JCIuOEg8O8QSX7idf-7YQxQpw",
  authDomain: "chess-world-1.firebaseapp.com",
  databaseURL: "https://chess-world-1.firebaseio.com",
  projectId: "chess-world-1",
  storageBucket: "chess-world-1.appspot.com",
  messagingSenderId: "325750297860",
  appId: "1:325750297860:web:f3e87f15718e6eef042c51",
  measurementId: "G-Z47ZS64MTT"
});

if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();

  messaging.setBackgroundMessageHandler(function(payload) {
    const { notification } = payload;
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );
    // Customize notification here
    const notificationTitle = notification.title;
    const notificationOptions = {
      body: notification.body,
      icon: "%PUBLIC_URL%/favicon-16x16.png"
    };

    return self.registration.showNotification(
      notificationTitle,
      notificationOptions
    );
  });
}
