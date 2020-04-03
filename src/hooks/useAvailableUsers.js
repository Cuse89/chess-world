import { useState, useEffect } from "react";
import firebase from "../firebase";

const useAvailableUsers = userId => {
  const [allAvailableUsers, setAvailableUsers] = useState([]);
  const [userAvailable, setUserAvailable] = useState(false);
  const availableUsers = allAvailableUsers.filter(user => user.id !== userId);
  const getAvailableUsersIds = () =>
    firebase.database
      .ref("availableUsers")
      .on("value", async allAvailableUsers => {
        const getAvailableUsersFromIds = async () => {
          const users = await firebase.getUsersFromIds(allAvailableUsers);
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

  useEffect(() => {
    if (userId) {
      setUserAvailable(allAvailableUsers.map(user => user.id).includes(userId));
    }
  }, [userId, allAvailableUsers]);

  useEffect(getAvailableUsersIds, []);

  return { availableUsers, updateAvailableUser, userAvailable };
};

export default useAvailableUsers;
