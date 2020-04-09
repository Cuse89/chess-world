import React, { useContext, useEffect } from "react";
import Context from "context";
import firebase from "../../firebase";
import ChallengePlayer from "components/dashboard-online/challenge-player";
import NameInput from "components/dashboard-online/name-input";

import useAvailableUsers from "hooks/useAvailableUsers";
import UserAvailability from "components/dashboard-online/user-availability";
import DashboardButton from "components/dashboard-button";
import usePushNotifications from "hooks/usePushNotifications";

const DashboardOnline = ({ history }) => {
  const { user } = useContext(Context);
  const userId = user && user.id;
  const { availableUsers } = useAvailableUsers(userId);
  const {
    isSubscribed,
    subscribeToNotifications,
    unsubscribeToNotifications,
    message
  } = usePushNotifications(userId);

  const { userAvailable, updateAvailableUser } = useAvailableUsers(userId);

  const login = async () => {
    try {
      await firebase.login();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user) {
      login();
    }
  }, [user]);

  if (user) {
    return (
      <div>
        <h3>Online play</h3>
        {user.name && (
          <UserAvailability
            user={user}
            userAvailable={userAvailable}
            updateAvailableUser={updateAvailableUser}
          />
        )}
        {message && <p>{message}</p>}
        {!user.name && (
          <NameInput user={user} updateAvailableUser={updateAvailableUser} />
        )}
        <DashboardButton
          displayText={`Turn ${isSubscribed ? "off" : "on"} notifications`}
          onClick={
            isSubscribed ? unsubscribeToNotifications : subscribeToNotifications
          }
          fullLength
          spaceTop
          type="warning"
        />
        {user.name && userAvailable && availableUsers.length > 0 && (
          <div>
            <h3>Users available</h3>
            {availableUsers.map(availableUser => (
              <ChallengePlayer
                key={`challenge-${availableUser.id}`}
                history={history}
                availableUser={availableUser}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
  return null;
};

export default DashboardOnline;
