import { useEffect, useState } from "react";
import firebase from "../firebase";

const usePushNotifications = userId => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState("");
  const [updatingSubscription, setUpdatingSubscription] = useState(false);
  const [fetchingSubscription, setFetchingSubscription] = useState(false);
  const isFetching = updatingSubscription || fetchingSubscription;

  const setAcceptsNotifications = (token, value) => {
    setUpdatingSubscription(true);
    try {
      firebase
        .updateUser(userId, "notificationTokens", { [token]: value })
        .then(a => setUpdatingSubscription(false));
    } catch (err) {
      setUpdatingSubscription(false);
      console.log(err);
    }
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
    const listenToNotificationsSubscribe = () => {
      firebase.getFromDatabaseListener(
        `users/${userId}/notificationTokens`,
        notificationTokens => {
          setFetchingSubscription(true);
          firebase.messaging.getToken().then(token => {
            setFetchingSubscription(false);
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
    if (userId) {
      listenToNotificationsSubscribe();
    }
    return () =>
      firebase.listenerUnsubscribe(`users/${userId}/notificationTokens`);
  }, [userId]);

  return {
    isSubscribed,
    subscribeToNotifications,
    unsubscribeToNotifications,
    message,
    isFetching
  };
};

export default usePushNotifications;
