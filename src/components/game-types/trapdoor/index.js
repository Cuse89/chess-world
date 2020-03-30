import React, { useContext, useState, useEffect } from "react";
import Board from "components/board";
import { Piece } from "components/piece";
import {
  getOpponent,
  getPieceProps,
  getSquareDetails,
  getUpdatedBoard,
  getUpdatedFallen,
  getUrlParam,
  loopBoard,
  mirrorBoard
} from "utils/helpers";
import useGameState from "hooks/useGameState";
import Context from "context";
import { emptySquare, GAME_MODES } from "utils/constants";
import Fallen from "components/fallen";
import firebase from "../../../firebase";

import styles from "./TrapdoorChess.module.scss";

const TrapdoorChess = () => {
  const { user, settings } = useContext(Context);
  const { gameMode } = settings;
  const userId = user && user.id;
  const [message, setMessage] = useState("");
  const gameId = getUrlParam("game");

  const {
    gameState,
    setGameState,
    handlePerformMove,
    performBotMove,
    updateSquare,
    canMovePiece,
    validateMove
  } = useGameState({
    gameMode,
    userId,
    gameId
  });

  const isOnePlayer = gameMode === GAME_MODES.ONE_PLAYER.TECHNICAL_NAME;
  const isTwoPlayer = gameMode === GAME_MODES.TWO_PLAYER.TECHNICAL_NAME;
  const isOnlinePlay = gameMode === GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME;
  const { board, turn, fallen, users, inCheck, inCheckmate } = gameState;
  const trapdoorsSet = countTrapdoors();

  const allTrapdoorsSet = trapdoorsSet === 4;

  useEffect(() => {
    handleNextTurn();
  }, [turn]);

  useEffect(() => {
    handleSetMessage();
  }, [inCheck, inCheckmate, trapdoorsSet]);

  function onDrop(a) {
    const sourceCoords = a.source.droppableId;
    const destinationCoords = a.destination.droppableId;
    if (validateMove(sourceCoords, destinationCoords)) {
      if (getSquareDetails(destinationCoords, board).trapdoor) {
        handleFallenInTrapdoor(sourceCoords);
      } else {
        handlePerformMove(sourceCoords, destinationCoords);
      }
    }
  }

  function handleFallenInTrapdoor(sourceCoords) {
    const updatedBoard = getUpdatedBoard(board, sourceCoords, emptySquare);
    const updatedFallen = getUpdatedFallen(
      getSquareDetails(sourceCoords, board),
      gameState.fallen
    );
    const sharedState = {
      turn: getOpponent(turn),
      fallen: updatedFallen
    };
    if (isOnePlayer) {
      setGameState({ ...gameState, ...sharedState, board: updatedBoard });
    }
    if (isOnlinePlay) {
      firebase.updateGame(gameId, {
        ...sharedState,
        board:
          users[userId].color === "black"
            ? mirrorBoard(updatedBoard)
            : updatedBoard
      });
    }
  }

  function handleNextTurn() {
    if (isOnePlayer && turn === "black" && !inCheckmate) {
      performBotMove();
    }
  }

  function getSquare(square) {
    const { player, pieceId, trapdoor } = square;
    const piece = pieceId && (
      <Piece
        key={`${player}-${pieceId}`}
        id={`${player}-${pieceId}`}
        icon={getPieceProps(pieceId).icon}
        pieceColor={player}
        available={allTrapdoorsSet && canMovePiece(player)}
      />
    );
    if (trapdoor && trapdoor[getPlayerColor()]) {
      return <div className={styles.trapdoor}>{square.pieceId && piece}</div>;
    }
    return piece || null;
  }

  function countTrapdoors() {
    const playerColor = getPlayerColor();
    let count = 0;
    loopBoard(board, ({ square }) => {
      if (square.trapdoor && square.trapdoor[playerColor]) {
        count++;
      }
    });
    return count;
  }

  function setTrapdoor(coords) {
    console.log("setTrapdoor", coords);
    if (!allTrapdoorsSet) {
      const square = getSquareDetails(coords, board);
      if (square.pieceId) {
        return;
      }
      updateSquare(coords, {
        ...square,
        trapdoor: { ...square.trapdoor, [getPlayerColor()]: true }
      });
    }
  }

  function getPlayerColor() {
    if (isOnlinePlay && gameState.users) {
      return gameState.users[userId].color;
    }
    if (isOnePlayer) {
      return "white";
    }
  }

  function getFallen(baseline) {
    if (isOnlinePlay && users) {
      const playerColor = users[userId].color;
      return baseline ? fallen[getOpponent(playerColor)] : fallen[playerColor];
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
    if (!allTrapdoorsSet) {
      message = `Set your trapdoors. ${4 - trapdoorsSet} left`;
    }
    setMessage(message);
  }

  return (
    <div className={styles.root}>
      <h4>{message}</h4>
      <Fallen fallen={getFallen()} />
      <Board
        board={board}
        getSquaresChild={getSquare}
        onDragEnd={onDrop}
        turn={turn}
        users={users}
        onSquareSelect={setTrapdoor}
      />
      <Fallen fallen={getFallen(true)} />
    </div>
  );
};

export default TrapdoorChess;
