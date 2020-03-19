import React, { useState } from "react";
import firebase from "../firebase";

const useUser = () => {
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.database
          .ref(`users/user-${user.uid}`)
          .on("value", snapshot =>
            setUser({ uid: user.uid, ...snapshot.val() })
          );
      } else {
        setUser(null);
      }
    });
  }, []);
  return user;
};

export default useUser;
