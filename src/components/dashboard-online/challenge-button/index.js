import React, { Fragment, useContext, useEffect } from "react";
import DashboardButton from "components/dashboard-button";
import { getPrettyFromTechnicalName } from "utils/helpers";
import { GAME_MODES, GAME_TYPES } from "utils/constants";
import Context from "context";
import useGameState from "hooks/useGameState";
import ConfirmModal from "components/confirm";
import GameSettings from "components/game-settings";

const ChallengeButton = ({
  opponentId,
  updateGameRequest,
  joinGame,
  setShowCreateGame,
  handleStartNewGame
}) => {
  const { user, gameSettings, setGameId } = useContext(Context);
  const { boardVariant } = gameSettings;

  const gameId =
    user.games &&
    Object.keys(user.games).filter(id => user.games[id] === opponentId)[0];

  const { gameState } = useGameState({
    gameMode: GAME_MODES.onlinePlay.technicalName,
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
    <DashboardButton onClick={() => setShowCreateGame(true)} fullLength>
      Challenge
    </DashboardButton>
  );
  if (user.requestsOutgoing && user.requestsOutgoing[opponentId]) {
    const gameSettings = user.requestsOutgoing[opponentId];
    button = (
      <ConfirmModal
        title="Challenge sent"
        onConfirm={() => updateGameRequest(user.id, opponentId, null)}
        acceptText="Remove challenge"
        cancelText="Back"
        content={<GameSettings settings={gameSettings} />}
      >
        <DashboardButton type={"warning"} fullLength>
          Challenge request sent
        </DashboardButton>
      </ConfirmModal>
    );
  }
  if (user.requestsIncoming && user.requestsIncoming[opponentId]) {
    const gameSettings = user.requestsIncoming[opponentId];
    button = (
      <ConfirmModal
        title="Incoming challenge"
        onConfirm={() => handleStartNewGame(gameSettings)}
        onCancel={() => updateGameRequest(opponentId, user.id, null)}
        acceptText="Play game"
        cancelText="Remove challenge"
        content={<GameSettings settings={gameSettings} />}
      >
        <DashboardButton type="accept" fullLength>
          Incoming Challenge
        </DashboardButton>
      </ConfirmModal>
    );
  }

  if (gameState.users) {
    const { gameType } = gameState;
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
