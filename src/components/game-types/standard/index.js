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
    handlePerformMove,
    performBotMove,
    isUsersTurn,
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
    handlePerformMove(a)
  }

  function handleNextTurn() {
    if (isOnePlayer && gameState.turn === "black") {
      performBotMove();
    }
  }

  function getPiece(square) {
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
    const {fallen, users} = gameState;
    if (isOnlinePlay && users) {
      const baselinePlayer = getBaselinePlayer(users.black, userId);
      return baseline
        ? fallen[getOpponent(baselinePlayer)]
        : fallen[baselinePlayer];
    } else {
      return baseline ? fallen.black : fallen.white;
    }
  }

  return (
    <div>
      <Fallen fallen={getFallen()} />
      <Board
        board={gameState.board}
        getSquaresChild={getPiece}
        onDragEnd={onDrop}
      />
      <Fallen fallen={getFallen(true)} />
    </div>
  );
};

export default Standard;
