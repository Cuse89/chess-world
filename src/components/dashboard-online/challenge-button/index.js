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

  const { gameState } = useGameState({
    gameMode: GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME,
    gameId: user.games && user.games[opponentId],
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
        settings: {...gameSettings}
      });
      await updateGameRequest(opponentId, user.id, null);
      await firebase.updateUser(user.id, "games", { [opponentId]: newGameId });
      await firebase.updateUser(opponentId, "games", { [user.id]: newGameId });
    } catch (err) {
      console.log(err);
    }
    joinGame(gameSettings.gameType, newGameId);
  };

  const getButton = () => {
    let button = (
      <DashboardButton
        displayText={"Challenge"}
        onClick={() => toggleShowCreateGame(true)}
        fullLength
      />
    );
    if (user.requestsOutgoing && user.requestsOutgoing[opponentId]) {
      button = (
        <DashboardButton
          displayText={"Challenge request sent"}
          onClick={() => updateGameRequest(user.id, opponentId, null)}
          type={"warning"}
          fullLength
        />
      );
    }
    if (user.requestsIncoming && user.requestsIncoming[opponentId]) {
      const gameSettings = user.requestsIncoming[opponentId]
      const gameType = gameSettings.gameType
      const gameTypeText = getPrettyFromTechnicalName(GAME_TYPES, gameType);
      button = (
        <DashboardButton
          displayText={`Incoming ${gameTypeText} request. Click to play!`}
          onClick={() => handleStartNewGame(opponentId, gameSettings)}
          type={"accept"}
          fullLength
        />
      );
    }
    if (gameState.users) {
      // Todo: fetch gametype from game object
      const gameType = gameState.settings.gameType;
      button = (
        <DashboardButton
          displayText={"Game in progress. Join Game"}
          onClick={() => joinGame(gameType, user.games[opponentId])}
          type={"accept"}
          fullLength
        />
      );
    }
    return button;
  };

  return <Fragment>{getButton()}</Fragment>;
};

export default ChallengeButton;
