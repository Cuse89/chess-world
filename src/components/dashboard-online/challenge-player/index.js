import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import CreateGame from "components/create-game";
import ChallengeButton from "components/dashboard-online/challenge-button";
import Context from "context";
import firebase from "../../../firebase";
import { v4 as uuid } from "uuid";
import Modal from "components/modal";
import { BOARDS } from "utils/constants";
import useGameSettings from "hooks/useGameSettings";
import styles from "./ChallengePlayer.module.scss";

const ChallengePlayer = ({ availableUser }) => {
  let history = useHistory();
  const { user } = useContext(Context);
  const [showCreateGame, setShowCreateGame] = useState(false);
  const { updateGameSettings, gameSettings } = useGameSettings();

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
    history.push(`/${gameType}?gameId=${gameId}`);
  };

  const onCreateGameSubmit = async (settings) => {
    setShowCreateGame(false);
    await updateGameRequest(user.id, availableUser.id, { ...settings });
  };

  const handleStartNewGame = async gameSettings => {
    const newGameId = `game-${uuid().split("-")[0]}`;
    try {
      await firebase.setGame(newGameId, {
        ...gameSettings,
        board: BOARDS[gameSettings.boardVariant].board,
        users: {
          [user.id]: {
            color: "white"
          },
          [availableUser.id]: {
            color: "black"
          }
        },
        turn: "white"
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
        setShowCreateGame={setShowCreateGame}
        updateGameRequest={updateGameRequest}
        joinGame={joinGame}
        handleStartNewGame={handleStartNewGame}
      />

      <Modal open={showCreateGame} onClose={() => setShowCreateGame(false)}>
        <h3>Challenge {availableUser.name}</h3>
        <CreateGame
          onSubmit={onCreateGameSubmit}
          submitText="Click here to challenge"
          onSettingChange={updateGameSettings}
          gameSettings={gameSettings}
        />
      </Modal>
    </div>
  );
};

export default ChallengePlayer;
