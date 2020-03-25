import React, { useContext, useEffect } from "react";
import Board from "components/board";
import { Piece } from "components/piece";
import {
  getBaselinePlayer,
  getOpponent,
  getPieceProps,
  getUrlParam
} from "utils/helpers";
import useGameState from "hooks/useGameState";
import Context from "context";
import { GAME_MODES } from "utils/constants";
import Fallen from "components/fallen";

const Standard = () => {
  const { user, settings } = useContext(Context);
  const { gameMode } = settings;
  const userId = user && user.id;

  const {
    gameState,
    performOfflineMove,
    performOnlineMove,
    performBotMove,
    isUsersTurn,
    validateOfflineMove,
    validateOnlineMove
  } = useGameState({
    gameMode,
    userId,
    gameId: getUrlParam("game")
  });

  const isOnePlayer = gameMode === GAME_MODES.ONE_PLAYER.TECHNICAL_NAME;
  const isTwoPlayer = gameMode === GAME_MODES.TWO_PLAYER.TECHNICAL_NAME;
  const isOnlinePlay = gameMode === GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME;

  useEffect(() => {
    handleNextTurn();
  }, [gameState.turn]);

  function onDrop(a) {
    if ((isOnePlayer || isTwoPlayer) && validateOfflineMove(a)) {
      performOfflineMove(a);
    } else if (isOnlinePlay && validateOnlineMove(a)) {
      performOnlineMove(a);
    }
  }

  function handleNextTurn() {
    if (isOnePlayer && gameState.turn === "black") {
      performBotMove();
    }
  }

  function getStandardSquaresChild(square) {
    const { player, pieceId, inCheck } = square;
    return square.pieceId ? (
      <Piece
        key={`${player}-${pieceId}`}
        className={`${player}-${pieceId}`}
        icon={getPieceProps(pieceId).icon}
        pieceColor={player}
        inCheck={inCheck}
        available={isUsersTurn()}
      />
    ) : null;
  }

  function getFallen(baseline) {
    if (isOnlinePlay && gameState.users) {
      console.log("yaaa")
      const baselinePlayer = getBaselinePlayer(gameState.users.black, userId);
      console.log("getFallen", baselinePlayer, gameState.fallen);
      console.log("mmmm",baseline
        ? gameState.fallen[getOpponent(baselinePlayer)]
        : gameState.fallen[baselinePlayer])
      return baseline
        ? gameState.fallen[getOpponent(baselinePlayer)]
        : gameState.fallen[baselinePlayer];
    } else {
      console.log("nnooo")
      return baseline ? gameState.fallen.black : gameState.fallen.white;
    }
  }

  return (
    <div>
      <Fallen fallen={getFallen()} />
      <Board
        board={gameState.board}
        getSquaresChild={getStandardSquaresChild}
        onDragEnd={onDrop}
      />
      <Fallen fallen={getFallen(true)} />
    </div>
  );
};

export default Standard;
