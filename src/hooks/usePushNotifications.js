import { useEffect, useState } from "react";
import firebase from "../firebase";

const usePushNotifications = userId => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState("");

  const listenToNotificationsSubscribe = () => {
    firebase.getFromDatabaseListener(
      `users/${userId}/notificationTokens`,
      notificationTokens => {
        firebase.messaging.getToken().then(token => {
          const acceptsNotifications =
            notificationTokens && notificationTokens[token];
          if (!isSubscribed && acceptsNotifications) {
            setIsSubscribed(true);
            handleMessageListener();
          } else if (!acceptsNotifications) {
            setIsSubscribed(false);
          }
        });
      }
    );
  };

  const setAcceptsNotifications = (token, value) => {
    firebase.updateUser(userId, "notificationTokens", { [token]: value });
  };

  const subscribeToNotifications = () => {
    firebase.messaging.getToken().then(token => {
      setAcceptsNotifications(token, true);
    });
  };

  const unsubscribeToNotifications = () => {
    firebase.messaging
      .getToken()
      .then(token =>
        firebase.messaging
          .deleteToken(token)
          .then(() => setAcceptsNotifications(token, null))
      );
  };

  const handleMessageListener = () => {
    firebase.messaging.onMessage(payload => {
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
