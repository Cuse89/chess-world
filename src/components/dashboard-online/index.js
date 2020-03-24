import React, { useContext, useEffect } from "react";
import firebase from "../../firebase";
import ChallengePlayer from "components/dashboard-online/challenge-player";
import NameInput from "components/dashboard-online/name-input";
import Context from "context";
import useAvailableUsers from "hooks/useAvailableUsers";

const DashboardOnline = ({history}) => {
  const { user } = useContext(Context);

  const { getUserAvailability } = useAvailableUsers();

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
        <NameInput user={user} />
        {user.name && getUserAvailability(user.id) && <ChallengePlayer history={history}/>}
      </div>
    );
  }
  return null;
};

export default DashboardOnline;
