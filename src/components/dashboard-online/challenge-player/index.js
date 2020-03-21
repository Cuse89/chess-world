import React, { useState } from "react";
import DashboardButton from "components/dashboard-button";

import firebase from "../../../firebase";
import styles from "./ChallengePlayer.module.scss";
import useAvailableUsers from "hooks/useAvailableUsers";

const ChallengePlayer = ({ user }) => {
  const [displayAvailableUsers, setDisplayAvailableUsers] = useState(false);
  const { availableUsers } = useAvailableUsers(user.id);

  const toggleDisplayAvailableUsers = () => {
    setDisplayAvailableUsers(prevState => !prevState);
  };

  const sendGameRequest = userId => {
    firebase.updateUser(userId, "requestsIncoming", { [user.id]: true });
  };

  const getButton = userId => {
    // user.requests && user.requests.forEach(request => {
    //   if (request === userId) {
    //     return (
    //       <DashboardButton
    //         displayText={"Awaiting Challenge"}
    //         onClick={() => {}}
    //         type={"warning"}
    //       />
    //     );
    //   }
    // });
    return (
      <DashboardButton
        displayText={"Challenge"}
        onClick={() => sendGameRequest(userId)}
        type={"accept"}
      />
    );
  };

  return (
    <div className={styles.root}>
      <DashboardButton
        displayText="Challenge new player"
        onClick={toggleDisplayAvailableUsers}
      />
      {displayAvailableUsers && availableUsers.length > 0 && (
        <div>
          {availableUsers.map(availableUser => (
            <div
              key={`challenge-${availableUser}`}
              className={styles.listItem}
            >
              <p>{availableUser.name}</p>
              {getButton(availableUser)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChallengePlayer;
