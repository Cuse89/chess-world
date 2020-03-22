import React, { useState, useEffect } from "react";
import firebase from "../firebase";

const useAvailableUsers = userId => {
  const [availableUsers, setAvailableUsers] = useState([]);
  const getAvailableUsersIds = () =>
    firebase.database.ref("availableUsers").on("value", async (allAvailableUsers) => {
      const getAvailableUsersFromIds = async () => {
        const filterOwnUser = id => userId !== id;
        const users = await firebase.getUsersFromIds(
          allAvailableUsers,
          filterOwnUser
        );
        setAvailableUsers(users);
      };

      try {
        await getAvailableUsersFromIds();
      } catch (err) {
        console.log(err);
      }
    });
  const updateAvailableUser = async (userId, value) => {
    await firebase.database.ref("availableUsers").update({ [userId]: value });
  };
  const getUserAvailability = userId =>
    availableUsers.map(user => user.id).includes(userId);

  useEffect(() => {
    getAvailableUsersIds();
  }, []);
  return { availableUsers, updateAvailableUser, getUserAvailability };
};

export default useAvailableUsers;
