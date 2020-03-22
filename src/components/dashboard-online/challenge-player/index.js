import React, { useState } from "react";
import DashboardButton from "components/dashboard-button";
import useAvailableUsers from "hooks/useAvailableUsers";
import firebase from "../../../firebase";

import styles from "./ChallengePlayer.module.scss";

const ChallengePlayer = ({ user, handleStartNewGame }) => {
  const { availableUsers } = useAvailableUsers(user.id);
  const [displayAvailableUsers, setDisplayAvailableUsers] = useState(false);
  const toggleDisplayAvailableUsers = () => {
    setDisplayAvailableUsers(prevState => !prevState);
  };
  const sendGameRequest = async (availableUserId, value) => {
    try {
      await firebase.updateUser(availableUserId, "requestsIncoming", {
        [user.id]: value
      });
      await firebase.updateUser(user.id, "requestsOutgoing", {
        [availableUserId]: value
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getButton = availableUser => {
    let button = (
      <DashboardButton
        displayText={"Challenge"}
        onClick={() => sendGameRequest(availableUser.id, true)}
        fullLength
      />
    );
    user.requestsOutgoing &&
    Object.keys(user.requestsOutgoing).forEach(requestUserId => {
      if (requestUserId === availableUser.id) {
        button = (
          <DashboardButton
            displayText={"Challenge request sent"}
            onClick={() => sendGameRequest(availableUser.id, null)}
            type={"warning"}
            fullLength
          />
        );
      }
    });
    user.requestsIncoming &&
    Object.keys(user.requestsIncoming).forEach(requestUserId => {
      if (requestUserId === availableUser.id) {
        button = (
          <DashboardButton
            displayText={"Incoming request. Click to play!"}
            onClick={() => handleStartNewGame(requestUserId)}
            type={"accept"}
            fullLength
          />
        );
      }
    });
    return button;
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
            <div key={`challenge-${availableUser}`} className={styles.root}>
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
