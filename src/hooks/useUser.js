import { useState, useEffect } from "react";
import firebase from "../firebase";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [fetchingUser, setFetchingUser] = useState(false);

  useEffect(() => {
    setFetchingUser(true);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.getFromDatabaseListener(`users/${user.uid}`, snapshot => {
          setUser({ id: user.uid, ...snapshot });
          setFetchingUser(false);
        });
      } else {
        setUser(null);
        setFetchingUser(false);
      }

    });
  }, []);
  return { user, fetchingUser };
};

export default useUser;
