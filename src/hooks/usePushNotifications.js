import { useEffect, useState } from "react";
import firebase from "../firebase";

const usePushNotifications = userId => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState("")

  const listenToNotificationsSubscribe = () => {
    firebase.getFromDatabaseListener(`users/${userId}`, user => {
      if (user.messageToken) {
        setIsSubscribed(true);
        handleMessageListener()
      } else if (!user.messageToken) {
        setIsSubscribed(false)
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
    console.log("handleMessageListener")
    firebase.messaging.onMessage(({message}) => {
      console.log('Message received. ', message);
      setMessage(message.notification.body)
    });
  }

  useEffect(() => {
    if (userId) {
      listenToNotificationsSubscribe();
    }
  }, [userId]);

  return { isSubscribed, subscribeToNotifications, unsubscribeToNotifications, message };
};

export default usePushNotifications;
