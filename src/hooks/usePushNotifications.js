import { useEffect, useState } from "react";
import firebase from "../firebase";

const usePushNotifications = userId => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState("");
  console.log({ isSubscribed });

  const listenToNotificationsSubscribe = () => {
    firebase.getFromDatabaseListener(`users/${userId}`, user => {
      if (user.acceptsNotifications) {
        // get new token (if on different device)
        subscribeToNotifications();
        setIsSubscribed(true);
        handleMessageListener();
      } else if (!user.acceptsNotifications) {
        setIsSubscribed(false);
      }
    });
  };

  const subscribeToNotifications = () => {
    firebase.getNotificationPermission(userId);
  };

  const unsubscribeToNotifications = () => {
    console.log("unsubscribe");
  };

  const handleMessageListener = () => {
    console.log("handleMessageListener");
    firebase.messaging.onMessage(payload => {
      console.log("Message received. ", payload);
      setMessage(payload.notification.body);
    });
  };

  useEffect(() => {}, []);

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
