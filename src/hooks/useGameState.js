import React, { useEffect, useState } from "react";
import defaultBoard from "lineups/defaultBoard";
import {
  getNextBoard,
  getOpponent,
  getTargetPiece, getUpdatedBoard,
  getUpdatedFallen,
  mirrorBoard,
  performValidation
} from "utils/helpers";
import { decideBotMove, getBotMoves } from "utils/onePlayerHelpers";
import firebase from "../firebase";
import { GAME_MODES } from "utils/constants";
import { getKingStatus } from "rules/getKingStatus";

const useGameState = ({ gameMode, gameId, userId }) => {
  const defaultTurn = "white";
  const defaultFallen = {
    white: [],
    black: []
  };

  const [gameState, setGameState] = useState({
    board: defaultBoard,
    turn: defaultTurn,
    fallen: defaultFallen,
    inCheck: "",
    inCheckmate: ""
  });

  const { board, turn, fallen, users } = gameState;

  const isOnePlayer = gameMode === GAME_MODES.ONE_PLAYER.TECHNICAL_NAME;
  const isTwoPlayer = gameMode === GAME_MODES.TWO_PLAYER.TECHNICAL_NAME;
  const isOnlinePlay = gameMode === GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME;
  const opponent = getOpponent(turn);
  const playerColorOnline = users && users[userId].color;
  const baselinePlayer =
    isOnePlayer || isTwoPlayer ? "white" : playerColorOnline;
  console.log({ baselinePlayer });

  console.log({ gameState, gameMode });

  function gameListener() {
    if (isOnlinePlay) {
      firebase.database.ref(`games/${gameId}`).on("value", async snapshot => {
        console.log("gameListener");
        const game = snapshot.val();
        setGameState({
          ...game,
          board: game.users[userId].color === "black" ? mirrorBoard(game.board) : game.board,
          fallen: game.fallen
            ? {
                black: game.fallen.black || [],
                white: game.fallen.white || []
              }
            : defaultFallen,
          users: game.users,
          inCheck: game.inCheck,
          inCheckmate: game.inCheckmate
        });
      });
    }
  }

  function handlePerformMove(sourceCoords, destinationCoords) {
    console.log("handlePerformMove");
    if (validateMove(sourceCoords, destinationCoords)) {
      performMove(sourceCoords, destinationCoords);
    }
  }

  function validateMove(sourceCoords, destinationCoords) {
    return performValidation({
      board,
      sourceCoords,
      destinationCoords,
      player: turn,
      baselinePlayer
    });
  }

  async function performMove(sourceCoords, destinationCoords) {
    const newGameState = getNextGameState(sourceCoords, destinationCoords);
    if (isOnePlayer || isTwoPlayer) {
      setGameState(newGameState);
    } else if (isOnlinePlay) {
      try {
        await firebase.updateGame(gameId, newGameState);
      } catch (err) {
        console.log(err);
      }
    }
  }

  function getNextGameState(sourceCoords, destinationCoords) {
    const nextBoard = getNextBoard(board, sourceCoords, destinationCoords);
    const opponentKingStatus = getKingStatus(nextBoard, opponent);
    return {
      board: handleMirroredBoard(nextBoard),
      turn: opponentKingStatus !== "checkmate" ? opponent : turn,
      fallen: getUpdatedFallen(
        getTargetPiece(board, destinationCoords),
        fallen
      ),
      inCheck: opponentKingStatus === "check" ? opponent : "",
      inCheckmate: opponentKingStatus === "checkmate" ? opponent : ""
    };
  }

  function performBotMove() {
    const selectedMove = decideBotMove(getBotMoves(board));
    console.log("selectedMove", selectedMove);
    const nextGameState = getNextGameState(
      selectedMove.source.coords,
      selectedMove.destination.coords
    );
    setGameState(nextGameState);
  }

  function canMovePiece(pieceColor) {
    if (turn === pieceColor) {
      if (isOnePlayer) {
        return turn === "white";
      }
      if (isTwoPlayer) {
        return true;
      }
      if (isOnlinePlay) {
        return users && users[userId].color === turn;
      }
    }
    return false;
  }

  function updateSquare(coords, value) {
    const boardCopy = getUpdatedBoard(board, coords, value)
    updateBoard(boardCopy);
  }

  function handleMirroredBoard(board) {
    console.log("handleMirroredBoard");
    console.log("baslineplyer", baselinePlayer, users);
    return baselinePlayer === "black" ? mirrorBoard(board) : board;
  }

  function updateBoard(newBoard) {
    if (isOnlinePlay) {
      firebase.updateGame(gameId, { board: handleMirroredBoard(newBoard) });
    } else {
      setGameState({ ...gameState, board: newBoard });
    }
  }

  useEffect(() => {
    if (gameId) {
      gameListener();
    }
  }, [gameId, userId]);

  return {
    gameState,
    setGameState,
    handlePerformMove,
    validateMove,
    performBotMove,
    canMovePiece,
    updateSquare,
    performMove
  };
};

export default useGameState;
