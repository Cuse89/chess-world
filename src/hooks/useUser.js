import { useState, useEffect } from "react";
import firebase from "../firebase";

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.getFromDatabaseListener(`users/${user.uid}`, snapshot => {
          setUser({ id: user.uid, ...snapshot });
        });
      } else {
        setUser(null);
      }
    });
  }, []);
  return user;
};

export default useUser;
