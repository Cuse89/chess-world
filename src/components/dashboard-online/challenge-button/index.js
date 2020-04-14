import React, { Fragment, useContext } from "react";
import DashboardButton from "components/dashboard-button";
import { getPrettyFromTechnicalName } from "utils/helpers";
import { GAME_MODES, GAME_TYPES } from "utils/constants";
import Context from "context";
import { v4 as uuid } from "uuid";
import firebase from "../../../firebase";
import defaultBoard from "lineups/defaultBoard";
import useGameState from "hooks/useGameState";

const ChallengeButton = ({
  opponentId,
  updateGameRequest,
  joinGame,
  toggleShowCreateGame
}) => {
  const { user } = useContext(Context);
  const gameId =
    user.games &&
    Object.keys(user.games).filter(id => user.games[id] === opponentId)[0];

  const { gameState } = useGameState({
    gameMode: GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME,
    gameId,
    userId: user.id
  });

  const handleStartNewGame = async (opponentId, gameSettings) => {
    const newGameId = `game-${uuid().split("-")[0]}`;
    try {
      await firebase.updateGame(newGameId, {
        users: {
          [user.id]: {
            color: "white"
          },
          [opponentId]: {
            color: "black"
          }
        },
        board: defaultBoard,
        turn: "white",
        settings: { ...gameSettings }
      });
      await updateGameRequest(opponentId, user.id, null);
      await firebase.updateUser(user.id, "games", { [newGameId]: opponentId });
      await firebase.updateUser(opponentId, "games", { [newGameId]: user.id });
    } catch (err) {
      console.log(err);
    }
    joinGame(gameSettings.gameType, newGameId);
  };

  const getButton = () => {
    let button = (
      <DashboardButton onClick={() => toggleShowCreateGame(true)} fullLength>
        Challenge
      </DashboardButton>
    );
    if (user.requestsOutgoing && user.requestsOutgoing[opponentId]) {
      button = (
        <DashboardButton
          onClick={() => updateGameRequest(user.id, opponentId, null)}
          type={"warning"}
          fullLength
        >
          Challenge request sent
        </DashboardButton>
      );
    }
    if (user.requestsIncoming && user.requestsIncoming[opponentId]) {
      const gameSettings = user.requestsIncoming[opponentId];
      const gameType = gameSettings.gameType;
      const gameTypeText = getPrettyFromTechnicalName(GAME_TYPES, gameType);
      button = (
        <DashboardButton
          onClick={() => handleStartNewGame(opponentId, gameSettings)}
          type={"accept"}
          fullLength
        >{`Incoming ${gameTypeText} request. Click to play!`}</DashboardButton>
      );
    }

    if (gameState.users) {
      // Todo: fetch gametype from game object
      const gameType = gameState.settings.gameType;
      button = (
        <DashboardButton
          onClick={() => joinGame(gameType, gameId)}
          type={"accept"}
          fullLength
        >
          Game in progress. Join Game
        </DashboardButton>
      );
    }
    return button;
  };

  return <Fragment>{getButton()}</Fragment>;
};

export default ChallengeButton;
