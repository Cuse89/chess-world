import React, { useContext, useState } from "react";
import DashboardButton from "components/dashboard-button";
import useAvailableUsers from "hooks/useAvailableUsers";
import CreateGame from "components/create-game";
import ChallengeButton from "components/dashboard-online/challenge-button";
import Context from "context";
import firebase from "../../../firebase";
import styles from "./ChallengePlayer.module.scss";

const ChallengePlayer = ({ history }) => {
  const { user } = useContext(Context);
  const { availableUsers } = useAvailableUsers(user.id);
  const [displayAvailableUsers, setDisplayAvailableUsers] = useState(false);
  const [showCreateGame, toggleShowCreateGame] = useState(false);
  const toggleDisplayAvailableUsers = () => {
    setDisplayAvailableUsers(prevState => !prevState);
  };

  const updateGameRequest = async (outgoingUserId, incomingUserId, value) => {
    try {
      await firebase.updateUser(incomingUserId, "requestsIncoming", {
        [outgoingUserId]: value
      });
      await firebase.updateUser(outgoingUserId, "requestsOutgoing", {
        [incomingUserId]: value
      });
    } catch (err) {
      console.log(err);
    }
  };

  const joinGame = (gameType, gameId) => {
    history.push(`/${gameType}?game=${gameId}`);
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
              {!showCreateGame && (
                <ChallengeButton
                  opponentId={availableUser.id}
                  toggleShowCreateGame={toggleShowCreateGame}
                  updateGameRequest={updateGameRequest}
                  joinGame={joinGame}
                />
              )}
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
