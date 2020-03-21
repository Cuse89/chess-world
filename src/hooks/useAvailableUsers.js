import React, { useState, useEffect } from "react";
import firebase from "../firebase";

const useAvailableUsers = userId => {
  const [availableUsers, setAvailableUsers] = useState([]);
  const getAvailableUsers = () =>
    firebase.database.ref("availableUsers").on("value", allAvailableUsers => {
      const users = [];
      firebase.database
        .ref("users")
        .once("value")
        .then(allUsers => {
          allAvailableUsers.val() &&
            Object.keys(allAvailableUsers.val()).forEach(user => {
              if (!userId || userId !== user) {
                users.push({ ...allUsers.val()[user], id: user });
              }
            });
          setAvailableUsers(users);
        });
    });
  const updateAvailableUser = async (userId, value) => {
    await firebase.database.ref("availableUsers").update({ [userId]: value });
  };
  const getUserAvailability = userId =>
    availableUsers.map(user => user.id).includes(userId);

  useEffect(() => {
    getAvailableUsers();
  }, []);
  return { availableUsers, updateAvailableUser, getUserAvailability };
};

export default useAvailableUsers;
