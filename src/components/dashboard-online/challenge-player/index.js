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
  const [showCreateGame, toggleShowCreateGame] = useState(false);

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

  const onCreateGameSubmit = async (settings, opponentId) => {
    toggleShowCreateGame(false);
    try {
      await updateGameRequest(user.id, opponentId, settings.gameType);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.root}>

      {availableUsers.length > 0 && (
        <div>
          <h3>Users online</h3>
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
                  onSubmit={settings =>
                    onCreateGameSubmit(settings, availableUser.id)
                  }
                  noHeader
                  submitText="Click here to challenge"
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
