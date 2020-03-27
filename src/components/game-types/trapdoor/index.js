import React, { useContext, useState, useEffect } from "react";
import Board from "components/board";
import { Piece } from "components/piece";
import {
  getBaselinePlayer,
  getOpponent,
  getPieceProps,
  getSquareDetails,
  getUrlParam,
  loopBoard
} from "utils/helpers";
import useGameState from "hooks/useGameState";
import Context from "context";
import { emptySquare, GAME_MODES } from "utils/constants";
import Fallen from "components/fallen";

import styles from "./TrapdoorChess.module.scss";

const TrapdoorChess = () => {
  const { user, settings } = useContext(Context);
  const { gameMode } = settings;
  const userId = user && user.id;
  const [message, setMessage] = useState("");

  const {
    gameState,
    handlePerformMove,
    performBotMove,
    updateSquare
  } = useGameState({
    gameMode,
    userId,
    gameId: getUrlParam("game")
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
    console.log("sss", getSquareDetails(destinationCoords, board));
    if (getSquareDetails(destinationCoords, board).trapdoor) {
      console.log({ sourceCoords });
      updateSquare(sourceCoords, emptySquare);
    } else {
      handlePerformMove(sourceCoords, destinationCoords);
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
        available={allTrapdoorsSet}
      />
    );
    if (trapdoor) {
      const displayTrapdoor = (
        <div className={styles.trapdoor}>{square.pieceId && piece}</div>
      );
      if (isOnlinePlay && gameState.users) {
        const playerColor =
          gameState.users.black === userId ? "black" : "white";
        console.log({playerColor})
        if (trapdoor === playerColor) {
          return displayTrapdoor;
        }
      }
      if (isOnePlayer && trapdoor === "white") {
        return displayTrapdoor;
      }
    }
    return piece || null;
  }

  function countTrapdoors() {
    let count = 0;
    loopBoard(board, ({ square }) => {
      if (square.trapdoor && square.trapdoor === "white") {
        count++;
      }
    });
    return count;
  }

  function setTrapdoor(coords) {
    const square = getSquareDetails(coords, board);
    if (allTrapdoorsSet || square.pieceId) {
      return;
    }
    updateSquare(coords, { ...square, trapdoor: "white" });
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
