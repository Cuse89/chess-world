import { useEffect, useState } from "react";
import firebase from "../firebase";

const usePushNotifications = userId => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const listenToNotificationsSubscribe = () => {
    firebase.getFromDatabaseListener(`users/${userId}`, user => {
      if (!isSubscribed && user.messageToken) {
        setIsSubscribed(true);
      }
    });
  };

  const subscribeToNotifications = () => {
    firebase.getNotificationPermission(userId);
  };

  const unsubscribeToNotifications = () => {
    console.log("unsubscribe");
  };

  useEffect(() => {
    listenToNotificationsSubscribe();
  }, []);

  return { isSubscribed, subscribeToNotifications, unsubscribeToNotifications };
};

export default usePushNotifications;
