import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import CreateGame from "components/create-game";
import ChallengeButton from "components/dashboard-online/challenge-button";
import Context from "context";
import firebase from "../../../firebase";
import styles from "./ChallengePlayer.module.scss";
import { v4 as uuid } from "uuid";
import defaultBoard from "lineups/defaultBoard";
import Modal from "components/modal";

const ChallengePlayer = ({ availableUser }) => {
  let history = useHistory();
  const { user } = useContext(Context);
  const [showCreateGame, toggleShowCreateGame] = useState(false);

  const updateGameRequest = async (outgoingUserId, incomingUserId, value) => {
    try {
      // update for both users
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
    await updateGameRequest(user.id, opponentId, { ...settings });
  };

  const handleStartNewGame = async gameSettings => {
    const newGameId = `game-${uuid().split("-")[0]}`;
    try {
      await firebase.updateGame(newGameId, {
        users: {
          [user.id]: {
            color: "white"
          },
          [availableUser.id]: {
            color: "black"
          }
        },
        board: defaultBoard,
        turn: "white",
        settings: { ...gameSettings }
      });
      await updateGameRequest(availableUser.id, user.id, null);
      await firebase.updateUser(user.id, "games", {
        [newGameId]: availableUser.id
      });
      await firebase.updateUser(availableUser.id, "games", {
        [newGameId]: user.id
      });
    } catch (err) {
      console.log(err);
    }
    joinGame(gameSettings.gameType, newGameId);
  };

  return (
    <div className={styles.root}>
      <p>{availableUser.name}</p>

      <ChallengeButton
        opponentId={availableUser.id}
        toggleShowCreateGame={toggleShowCreateGame}
        updateGameRequest={updateGameRequest}
        joinGame={joinGame}
        handleStartNewGame={handleStartNewGame}
      />

      <Modal open={showCreateGame} onClose={() => toggleShowCreateGame(false)}>
        <h3>Challenge {availableUser.name}</h3>
        <CreateGame
          onSubmit={settings => onCreateGameSubmit(settings, availableUser.id)}
          submitText="Click here to challenge"
        />
      </Modal>
    </div>
  );
};

export default ChallengePlayer;
