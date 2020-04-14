import React, { useContext, useEffect } from "react";
import Context from "context";
import firebase from "../../firebase";
import ChallengePlayer from "components/dashboard-online/challenge-player";
import NameInput from "components/dashboard-online/name-input";

import useAvailableUsers from "hooks/useAvailableUsers";
import UserAvailability from "components/user-profile/user-availability-setting";
import DashboardButton from "components/dashboard-button";
import usePushNotifications from "hooks/usePushNotifications";

const DashboardOnline = () => {
  const { user } = useContext(Context);
  const userId = user && user.id;
  const { availableUsers } = useAvailableUsers(userId);
  const {
    isSubscribed,
    subscribeToNotifications,
    unsubscribeToNotifications,
    message
  } = usePushNotifications(userId);

  const { userAvailable } = useAvailableUsers(userId);

  const login = async () => {
    await firebase.login();
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
        {message && <p>{message}</p>}
        {!user.name && (
          <NameInput user={user} />
        )}
        {user.name && userAvailable && availableUsers.length > 0 && (
          <div>
            <h3>Users available</h3>
            {availableUsers.map(availableUser => (
              <ChallengePlayer
                key={`challenge-${availableUser.id}`}
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
