import React, { useContext, useEffect } from "react";
import Context from "context";
import firebase from "../../firebase";
import ChallengePlayer from "components/dashboard-online/challenge-player";
import NameInput from "components/dashboard-online/name-input";

import useAvailableUsers from "hooks/useAvailableUsers";
import UserAvailability from "components/dashboard-online/user-availability";

const DashboardOnline = ({ history }) => {
  const { user } = useContext(Context);

  const { userAvailable, updateAvailableUser } = useAvailableUsers(
    user && user.id
  );

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
        {!user.name && (
          <NameInput user={user} updateAvailableUser={updateAvailableUser} />
        )}
        {user.name && userAvailable && <ChallengePlayer history={history} />}
      </div>
    );
  }
  return null;
};

export default DashboardOnline;
