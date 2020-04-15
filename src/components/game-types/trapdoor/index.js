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
import { EMPTY_SQUARE, GAME_MODES } from "utils/constants";
import Fallen from "components/fallen";
import firebase from "../../../firebase";
import { decideBotMove, getBotMoves } from "utils/onePlayerHelpers";

import styles from "./TrapdoorChess.module.scss";

const TrapdoorChess = ({ history }) => {
  const { user, gameSettings } = useContext(Context);
  const { gameMode, trapdoorsAmount, setGameId } = gameSettings;
  const gameId = getUrlParam("game");
  const userId = user && user.id;
  const [message, setMessage] = useState("");

  const {
    gameState,
    setGameState,
    updateSquare,
    updateBoard,
    canMovePiece,
    validateMove,
    performMove,
  } = useGameState({
    gameMode,
    userId,
    gameId
  });

  const isOnePlayer = gameMode === GAME_MODES.ONE_PLAYER.TECHNICAL_NAME;
  const isOnlinePlay = gameMode === GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME;
  const { board, turn, fallen, users, inCheck, inCheckmate } = gameState;
  const trapdoorsSet = countTrapdoors();
  const trapdoorsLeft = trapdoorsAmount - trapdoorsSet;

  useEffect(() => {
    if (gameId) {
      setGameId(gameId);
    }
  }, [gameId, setGameId]);

  useEffect(() => {
    const handleNextTurn = () => {
      if (isOnePlayer && turn === "black" && !inCheckmate) {
        const selectedMove = decideBotMove(getBotMoves(board));
        const { source, destination } = selectedMove;
        handleTrapdoor(source.coords, destination.coords);
      }
    };
    handleNextTurn();
    // eslint-disable-next-line
  }, [turn]);

  useEffect(() => {
    const handleSetMessage = () => {
      let newMessage = "";
      if (inCheck) {
        newMessage = `${turn} in check`;
      }
      if (inCheckmate) {
        newMessage = `Checkmate. ${turn} wins`;
      }
      if (trapdoorsLeft !== 0) {
        newMessage = `Set your trapdoors. ${trapdoorsLeft} left`;
      }
      if (message !== newMessage) {
        setMessage(newMessage);
      }

    };
    handleSetMessage();
  }, [turn, inCheck, inCheckmate, trapdoorsLeft]);

  useEffect(() => {
    const setBotTrapdoors = () => {
      const emptySquares = [];
      const trapdoorCoords = [];
      let newBoard = board;
      loopBoard(
        board,
        ({ square, coords }) => !square.pieceId && emptySquares.push(coords)
      );
      while (trapdoorCoords.length < trapdoorsAmount) {
        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        const coords = emptySquares[randomIndex];
        if (!trapdoorCoords.includes(coords)) {
          trapdoorCoords.push(coords);
        }
      }
      trapdoorCoords.forEach(coords => {
        coords.toString();
        const square = getSquareDetails(coords, board);
        newBoard = getUpdatedBoard(newBoard, coords, {
          ...square,
          trapdoor: { ...square.trapdoor, black: true }
        });
      });
      updateBoard(newBoard);
    };
    if (isOnePlayer && trapdoorsAmount === 0) {
      setBotTrapdoors();
    }
    // eslint-disable-next-line
  }, [isOnePlayer]);

  useEffect(() => {
    if (gameState.status === "ended") {
      history.push("/");
    }
  }, [gameState, history]);

  function onDrop(move) {
    const sourceCoords = move.source.droppableId;
    const destinationCoords = move.destination.droppableId;
    if (validateMove(sourceCoords, destinationCoords)) {
      handleTrapdoor(sourceCoords, destinationCoords);
    }
  }

  function handleTrapdoor(sourceCoords, destinationCoords) {
    const square = getSquareDetails(destinationCoords, board);
    if (square.trapdoor) {
      handleFallenInTrapdoor(sourceCoords);
    } else {
      performMove(sourceCoords, destinationCoords);
    }
  }

  function handleFallenInTrapdoor(sourceCoords) {
    const updatedBoard = getUpdatedBoard(board, sourceCoords, EMPTY_SQUARE);
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

  function getSquare(square) {
    const { player, pieceId, trapdoor } = square;
    const piece = pieceId && (
      <Piece
        key={`${player}-${pieceId}`}
        id={`${player}-${pieceId}`}
        icon={getPieceProps(pieceId).icon}
        pieceColor={player}
        available={trapdoorsLeft === 0 && canMovePiece(player)}
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
    if (trapdoorsLeft !== 0) {
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

  return (
    <div className={styles.root}>
      {message && <div>{message}</div>}
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
