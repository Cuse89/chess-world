import { useState, useEffect } from "react";
import firebase from "../firebase";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [userOnline, setUserOnline] = useState(false);

  useEffect(() => {
    firebase.getFromDatabaseListener(".info/connected", isOnline => {
      setUserOnline(isOnline);
    });
  }, []);

  useEffect(() => {
    setIsFetching(true);
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.getFromDatabaseOnce(`users/${user.uid}`, userDetails => {
          setUser({ id: user.uid, ...userDetails });
          setIsFetching(false);
        });
      } else {
        setUser(null);
        setIsFetching(false);
      }
    });

    //todo: find better solution to remove spinny loader if user is offline
    setTimeout(() => {
      setIsFetching(false);
    }, 2000);

    return () => unsubscribe();
  }, [userOnline]);

  return { user, isFetching, userOnline };
};

export default useUser;
