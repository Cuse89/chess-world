import React, { useState } from "react";
import DashboardButton from "components/dashboard-button";
import useAvailableUsers from "hooks/useAvailableUsers";

import styles from "./ChallengePlayer.module.scss";

const ChallengePlayer = ({ user, handleStartNewGame, updateGameRequest, joinGame }) => {
  const { availableUsers } = useAvailableUsers(user.id);
  const [displayAvailableUsers, setDisplayAvailableUsers] = useState(false);
  const toggleDisplayAvailableUsers = () => {
    setDisplayAvailableUsers(prevState => !prevState);
  };

  const getButton = availableUser => {
    let button = (
      <DashboardButton
        displayText={"Challenge"}
        onClick={() => updateGameRequest(user.id, availableUser.id, true)}
        fullLength
      />
    );
    if (user.requestsOutgoing && user.requestsOutgoing[availableUser.id]) {
      button = (
        <DashboardButton
          displayText={"Challenge request sent"}
          onClick={() => updateGameRequest(user.id, availableUser.id, null)}
          type={"warning"}
          fullLength
        />
      );
    }
    if (user.requestsIncoming && user.requestsIncoming[availableUser.id]) {
      button = (
        <DashboardButton
          displayText={"Incoming request. Click to play!"}
          onClick={() => handleStartNewGame(availableUser.id)}
          type={"accept"}
          fullLength
        />
      );
    }
    if (user.games && user.games[availableUser.id]) {
      button = (
        <DashboardButton
          displayText={"Game in progress. Join Game"}
          onClick={() => joinGame(user.games[availableUser.id])}
          type={"accept"}
          fullLength
        />
      );
    }
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
