import React, { useEffect, useState } from "react";
import defaultBoard from "lineups/defaultBoard";
import {
  getBaselinePlayer,
  getNextBoard,
  getOpponent,
  getTargetPiece,
  getUpdatedFallen,
  getUrlParam,
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
  const baselinePlayer =
    isOnePlayer || isTwoPlayer
      ? "white"
      : users && getBaselinePlayer(users.black, userId);

  console.log({ gameState, gameMode });

  function gameListener() {
    if (isOnlinePlay) {
      firebase.database.ref(`games/${gameId}`).on("value", async snapshot => {
        const game = snapshot.val();
        setGameState({
          ...game,
          board:
            game.users.black === userId ? mirrorBoard(game.board) : game.board,
          fallen: game.fallen
            ? {
                black: game.fallen.black || [],
                white: game.fallen.white || []
              }
            : defaultFallen,
          test: "test"
        });
      });
    }
  }

  function handlePerformMove(sourceCoords, destinationCoords) {
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
      baselinePlayer: isOnePlayer || isTwoPlayer ? "white" : baselinePlayer
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
    console.log({ opponentKingStatus }, { opponent });
    return {
      board: baselinePlayer === "black" ? mirrorBoard(nextBoard) : nextBoard,
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
        return users && users[turn] === userId;
      }
    }
    return false;
  }

  function updateSquare(coords, value) {
    let boardCopy = JSON.parse(JSON.stringify(board));
    boardCopy[coords[0]][coords[1]] = value;
    updateBoard(boardCopy);
  }

  function updateBoard(newBoard) {
    if (isOnlinePlay) {
      firebase.updateGame(gameId, { board: newBoard });
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
    handlePerformMove,
    validateMove,
    performBotMove,
    canMovePiece,
    updateSquare,
  };
};

export default useGameState;
