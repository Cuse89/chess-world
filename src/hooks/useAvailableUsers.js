import { useState, useEffect } from "react";
import firebase from "../firebase";

const useAvailableUsers = userId => {
  const [allAvailableUsers, setAvailableUsers] = useState([]);
  const [userAvailable, setUserAvailable] = useState(false);
  const availableUsers = allAvailableUsers.filter(user => user.id !== userId);

  const getAvailableUsersIds = () =>
    firebase.getFromDatabaseListener(
      "availableUsers",
      async allAvailableUsers => {
        const users = await firebase.getUsersFromIds(allAvailableUsers);
        setAvailableUsers(users);
      }
    );

  const updateAvailableUser = async (userId, value) => {
    try {
      await firebase.updateDatabase("availableUsers", { [userId]: value });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userId) {
      setUserAvailable(allAvailableUsers.map(user => user.id).includes(userId));
    }
  }, [userId, allAvailableUsers]);

  useEffect(() => {
    getAvailableUsersIds();
  }, []);

  return { availableUsers, updateAvailableUser, userAvailable };
};

export default useAvailableUsers;
