import React, { Fragment, useContext, useEffect } from "react";
import DashboardButton from "components/dashboard-button";
import { getPrettyFromTechnicalName } from "utils/helpers";
import { GAME_MODES, GAME_TYPES } from "utils/constants";
import Context from "context";
import useGameState from "hooks/useGameState";

const ChallengeButton = ({
  opponentId,
  updateGameRequest,
  joinGame,
  toggleShowCreateGame,
  handleStartNewGame
}) => {
  const { user, gameSettings } = useContext(Context);
  const { setGameId, boardVariant } = gameSettings;

  const gameId =
    user.games &&
    Object.keys(user.games).filter(id => user.games[id] === opponentId)[0];

  const { gameState } = useGameState({
    gameMode: GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME,
    gameId,
    userId: user.id,
    boardVariant
  });

  useEffect(() => {
    if (gameId) {
      setGameId(gameId);
    }
  }, [setGameId, gameId]);

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
        onClick={() => handleStartNewGame(gameSettings)}
        type={"accept"}
        fullLength
      >{`Incoming ${gameTypeText} request. Click to play!`}</DashboardButton>
    );
  }

  if (gameState.users) {
    const gameType = gameState.gameType;
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

  return <Fragment>{button}</Fragment>;
};

export default ChallengeButton;
