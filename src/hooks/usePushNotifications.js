import { useEffect, useState } from "react";
import firebase from "../firebase";

const usePushNotifications = userId => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState("");
  console.log({ isSubscribed });

  const listenToNotificationsSubscribe = () => {
    firebase.getFromDatabaseListener(`users/${userId}`, user => {
      if (!isSubscribed && user.acceptsNotifications) {
        // get new token (if on different device)
        subscribeToNotifications();
        setIsSubscribed(true);
        handleMessageListener();
      } else if (!user.acceptsNotifications) {
        setIsSubscribed(false);
      }
    });
  };

  const getToken = callback => {
    firebase.messaging
      .getToken()
      .then(token => {
        if (token) {
          console.log({ token });
          callback(token);
        } else {
          // Show permission request.
          console.log(
            "No Instance ID token available. Request permission to generate one."
          );
          // Show permission UI.
          // updateUIForPushPermissionRequired;
        }
      })
      .catch(err => {
        console.log("An error occurred while retrieving token. ", err);
        // showToken('Error retrieving Instance ID token. ', err);
        // setTokenSentToServer(false);
      });
  };

  const setAcceptsNotifications = accepts => {
    firebase.setUser(userId, "acceptsNotifications", accepts);
  };

  const subscribeToNotifications = () => {
    console.log("subscribeToNotifications");
    getToken(() => setAcceptsNotifications(true));
  };

  const unsubscribeToNotifications = () => {
    console.log("unsubscribe");
    getToken(token =>
      firebase.messaging
        .deleteToken(token)
        .then(() => setAcceptsNotifications(false))
    );
  };

  const handleMessageListener = () => {
    console.log("handleMessageListener");
    firebase.messaging.onMessage(payload => {
      console.log("Message received. ", payload);
      setMessage(payload.notification.body);
    });
  };

  useEffect(() => {
    if (userId) {
      listenToNotificationsSubscribe();
    }
  }, [userId]);

  return {
    isSubscribed,
    subscribeToNotifications,
    unsubscribeToNotifications,
    message
  };
};

export default usePushNotifications;
