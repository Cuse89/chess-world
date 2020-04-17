import { useState, useEffect } from "react";
import firebase from "../firebase";

const useAvailableUsers = userId => {
  const [allAvailableUsers, setAvailableUsers] = useState([]);
  const [userAvailable, setUserAvailable] = useState(false);
  const [updatingAvailableUsers, setUpdatingAvailableUsers] = useState(false);
  const [fetchingUsers, setFetchingUsers] = useState(false);
  const isFetching = updatingAvailableUsers || fetchingUsers;
  const availableUsers = allAvailableUsers.filter(user => user.id !== userId);



  const updateAvailableUser = async (userId, value) => {
    try {
      setUpdatingAvailableUsers(true);
      await firebase
        .updateDatabase("availableUsers", { [userId]: value })
        .then(() => setUpdatingAvailableUsers(false));
    } catch (err) {
      setUpdatingAvailableUsers(false);
      console.log(err);
    }
  };

  useEffect(() => {
    if (userId) {
      setUserAvailable(allAvailableUsers.map(user => user.id).includes(userId));
    }
  }, [userId, allAvailableUsers]);

  useEffect(() => {
    const getAvailableUsersIds = () =>
      firebase.getFromDatabaseListener(
        "availableUsers",
        async allAvailableUsers => {
          setFetchingUsers(true);
          try {
            const users = await firebase.getFromDatabaseOnce("users", allUsers =>
              Object.keys(allAvailableUsers).map(userId => ({
                ...allUsers[userId],
                id: userId
              }))
            );
            setAvailableUsers(users);
            if (users) {
              setFetchingUsers(false);
            }
          } catch (err) {
            console.log(err);
            setFetchingUsers(false);
          }
        }
      );
    getAvailableUsersIds();
    return () => firebase.listenerUnsubscribe("availableUsers")
  }, []);

  return { availableUsers, updateAvailableUser, userAvailable, isFetching };
};

export default useAvailableUsers;
