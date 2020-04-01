import React, { useContext, useState, useEffect } from "react";
import Board from "components/board";
import { Piece } from "components/piece";
import { getOpponent, getPieceProps, getUrlParam } from "utils/helpers";
import useGameState from "hooks/useGameState";
import Context from "context";
import { GAME_MODES } from "utils/constants";
import Fallen from "components/fallen";

const StandardChess = ({ history }) => {
  const { user, gameSettings } = useContext(Context);
  const { gameMode, setGameId } = gameSettings;
  const gameId = getUrlParam("game");
  const userId = user && user.id;
  const [message, setMessage] = useState("");

  const {
    gameState,
    handlePerformMove,
    performBotMove,
    canMovePiece,
    gameExists
  } = useGameState({
    gameMode,
    userId,
    gameId
  });

  const isOnePlayer = gameMode === GAME_MODES.ONE_PLAYER.TECHNICAL_NAME;
  const isOnlinePlay = gameMode === GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME;
  const { board, turn, fallen, users, inCheck, inCheckmate } = gameState;

  useEffect(() => {
    if (gameId) {
      setGameId(gameId);
    }
  }, [setGameId, gameId]);

  useEffect(() => {
    const handleNextTurn = () => {
      if (isOnePlayer && turn === "black" && !inCheckmate) {
        performBotMove();
      }
    };
    handleNextTurn();
    // eslint-disable-next-line
  }, [turn]);

  useEffect(() => {
    const handleSetMessage = () => {
      let message = "";
      if (inCheck) {
        message = `${turn} in check`;
      }
      if (inCheckmate) {
        message = `Checkmate. ${turn} wins`;
      }
      setMessage(message);
    };
    handleSetMessage();
  }, [turn, inCheck, inCheckmate]);

  useEffect(() => {
    console.log({ gameExists });
    if (!gameExists) {
      history.push("/chess-world");
    }
  }, [gameExists, history]);

  function onDrop(a) {
    const sourceCoords = a.source.droppableId;
    const destinationCoords = a.destination.droppableId;
    handlePerformMove(sourceCoords, destinationCoords);
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
      const playerColor = users[userId].color;
      return baseline ? fallen[getOpponent(playerColor)] : fallen[playerColor];
    } else {
      return baseline ? fallen.black : fallen.white;
    }
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

export default StandardChess;
