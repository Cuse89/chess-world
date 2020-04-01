import { useState, useEffect } from "react";
import firebase from "../firebase";

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.database
          .ref(`users/${user.uid}`)
          .on("value", snapshot =>
            setUser({ id: user.uid, ...snapshot.val() })
          );
      } else {
        setUser(null);
      }
    });
  }, []);
  return user;
};

export default useUser;
