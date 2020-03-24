import React, { useContext, useState } from "react";
import DashboardButton from "components/dashboard-button";
import useAvailableUsers from "hooks/useAvailableUsers";

import { Context } from "components/app";
import styles from "./ChallengePlayer.module.scss";
import { GAME_TYPES } from "utils/constants";
import { getPrettyFromTechnicalName } from "utils/helpers";
import CreateGame from "components/create-game";

const ChallengePlayer = ({
  handleStartNewGame,
  updateGameRequest,
  joinGame
}) => {
  const { user } = useContext(Context);
  const { availableUsers } = useAvailableUsers(user.id);
  const [displayAvailableUsers, setDisplayAvailableUsers] = useState(false);
  const [showCreateGame, toggleShowCreateGame] = useState(false);
  const toggleDisplayAvailableUsers = () => {
    setDisplayAvailableUsers(prevState => !prevState);
  };

  const getButton = availableUser => {
    let button = (
      <DashboardButton
        displayText={"Challenge"}
        onClick={() => toggleShowCreateGame(true)}
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
      const gameType = user.requestsIncoming[availableUser.id].gameType;
      const gameTypeText = getPrettyFromTechnicalName(GAME_TYPES, gameType);
      button = (
        <DashboardButton
          displayText={`Incoming ${gameTypeText} request. Click to play!`}
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
          onClick={() => joinGame(user.games[availableUser.id].gameType)}
          type={"accept"}
          fullLength
        />
      );
    }
    return button;
  };

  const onCreateGameSubmit = (gameType, opponentId) => {
    toggleShowCreateGame(false);
    updateGameRequest(user.id, opponentId, gameType);
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
            <div key={`challenge-${availableUser}`} className={styles.content}>
              <p>{availableUser.name}</p>
              {!showCreateGame && getButton(availableUser)}
              {showCreateGame && (
                <CreateGame
                  onSubmit={gameType =>
                    onCreateGameSubmit(gameType, availableUser.id)
                  }
                  useCompact={true}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChallengePlayer;
