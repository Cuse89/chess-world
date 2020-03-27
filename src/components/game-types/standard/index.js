import React, { useContext, useState, useEffect } from "react";
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
  const [message, setMessage] = useState("");

  const {
    gameState,
    handlePerformMove,
    performBotMove,
    canMovePiece
  } = useGameState({
    gameMode,
    userId,
    gameId: getUrlParam("game")
  });

  const isOnePlayer = gameMode === GAME_MODES.ONE_PLAYER.TECHNICAL_NAME;
  const isTwoPlayer = gameMode === GAME_MODES.TWO_PLAYER.TECHNICAL_NAME;
  const isOnlinePlay = gameMode === GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME;
  const { board, turn, fallen, users, inCheck, inCheckmate } = gameState;

  useEffect(() => {
    handleNextTurn();
  }, [turn]);

  useEffect(() => {
    handleSetMessage();
  }, [inCheck, inCheckmate]);

  function onDrop(a) {
    const sourceCoords = a.source.droppableId;
    const destinationCoords = a.destination.droppableId;
    handlePerformMove(sourceCoords, destinationCoords);
  }

  function handleNextTurn() {
    if (isOnePlayer && turn === "black" && !inCheckmate) {
      performBotMove();
    }
  }

  function getPiece(square) {
    const { player, pieceId, inCheck } = square;
    return square.pieceId ? (
      <Piece
        key={`${player}-${pieceId}`}
        id={`${player}-${pieceId}`}
        icon={getPieceProps(pieceId).icon}
        pieceColor={player}
        inCheck={inCheck}
        available={canMovePiece(player)}
      />
    ) : null;
  }

  function getFallen(baseline) {
    if (isOnlinePlay && users) {
      const baselinePlayer = getBaselinePlayer(users.black, userId);
      return baseline
        ? fallen[getOpponent(baselinePlayer)]
        : fallen[baselinePlayer];
    } else {
      return baseline ? fallen.black : fallen.white;
    }
  }

  function handleSetMessage() {
    let message = "";
    if (inCheck) {
      message = `${turn} in check`;
    }
    if (inCheckmate) {
      message = `Checkmate. ${turn} wins`;
    }
    setMessage(message);
  }

  return (
    <div>
      <div>{message}</div>
      <Fallen fallen={getFallen()} />
      <Board
        board={board}
        getSquaresChild={getPiece}
        onDragEnd={onDrop}
        turn={turn}
        users={users}
      />
      <Fallen fallen={getFallen(true)} />
    </div>
  );
};

export default Standard;
