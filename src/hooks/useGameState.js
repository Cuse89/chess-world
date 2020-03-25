import React, { useEffect, useState } from "react";
import defaultBoard from "lineups/defaultBoard";
import {
  getNextBoard,
  getOpponent,
  getTargetPiece,
  getUpdatedFallen,
  kingStatusOpponent,
  kingStatusSelf,
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

  const isOnePlayer = gameMode === GAME_MODES.ONE_PLAYER.TECHNICAL_NAME;
  const isTwoPlayer = gameMode === GAME_MODES.TWO_PLAYER.TECHNICAL_NAME;
  const isOnlinePlay = gameMode === GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME;

  console.log({ gameState, gameMode });

  function handleMirroredBoard(board, blackId) {
    // if onlinePlay and player is black, mirror board from db, and also mirror back before sending back to db
    return blackId === userId ? mirrorBoard(board) : board;
  }

  function gameListener() {
    if (isOnlinePlay) {
      firebase.database.ref(`games/${gameId}`).on("value", async snapshot => {
        const game = snapshot.val();
        setGameState({
          ...game,
          board: handleMirroredBoard(game.board, game.users.black)
        });
      });
    }
  }

  async function performMove(a) {
    const { board, turn } = gameState;
    const sourceCoords = a.source.droppableId;
    const destinationCoords = a.destination.droppableId;
    const baselinePlayer =
      isOnlinePlay && gameState.users.black === userId ? "black" : "white";
    const validMove = performValidation({
      board,
      sourceCoords,
      destinationCoords,
      player: gameState.turn,
      baselinePlayer
    });
    if (!validMove) {
      return;
    }

    const nextBoard = getNextBoard(board, sourceCoords, destinationCoords);
    const opponent = getOpponent(turn);
    const opponentKingStatus = getKingStatus(nextBoard, getOpponent(turn), baselinePlayer);
    const newGameState = {
      ...gameState,
      board: nextBoard,
      turn: opponent,
      fallen:
        getUpdatedFallen(
          getTargetPiece(board, destinationCoords),
          gameState.fallen
        ) || defaultFallen,
      inCheck:
        opponentKingStatus === "check" ? opponent : gameState.inCheck || "",
      inCheckmate:
        opponentKingStatus === "checkmate"
          ? opponent
          : gameState.inCheckmate || ""
    };
    if (isOnePlayer || isTwoPlayer) {
      setGameState(newGameState);
    } else if (isOnlinePlay) {
      try {
        await firebase.updateGame(gameId, {
          ...newGameState,
          board: handleMirroredBoard(nextBoard, gameState.users.black)
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  function performBotMove() {
    const selectedMove = decideBotMove(getBotMoves(gameState.board));
    const board = getNextBoard(
      gameState.board,
      selectedMove.source.coords,
      selectedMove.destination.coords
    );
    setGameState({
      ...gameState,
      board,
      turn: getOpponent(gameState.turn)
    });
  }

  function isUsersTurn() {
    if (isOnePlayer) {
      return gameState.turn === "white";
    }
    if (isOnlinePlay) {
      return gameState.users && gameState.users[gameState.turn] === userId;
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
    performMove,
    performBotMove,
    isUsersTurn
  };
};

export default useGameState;
