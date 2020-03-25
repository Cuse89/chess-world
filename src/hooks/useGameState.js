import React, { useEffect, useState } from "react";
import defaultBoard from "lineups/defaultBoard";
import {
  getBaselinePlayer,
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
  const opponent = getOpponent(gameState.turn);
  const baselinePlayer = gameState.users && getBaselinePlayer(gameState.users.black, userId);

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
            : defaultFallen
        });
      });
    }
  }

  function validateOfflineMove(a) {
    const { board } = gameState;
    const sourceCoords = a.source.droppableId;
    const destinationCoords = a.destination.droppableId;

    return performValidation({
      board,
      sourceCoords,
      destinationCoords,
      player: gameState.turn,
      baselinePlayer: "white"
    });
  }

  function validateOnlineMove(a) {
    const { board } = gameState;
    const sourceCoords = a.source.droppableId;
    const destinationCoords = a.destination.droppableId;

    return performValidation({
      board,
      sourceCoords,
      destinationCoords,
      player: gameState.turn,
      baselinePlayer
    });
  }

  async function performOnlineMove(a) {
    const { board } = gameState;
    const sourceCoords = a.source.droppableId;
    const destinationCoords = a.destination.droppableId;
    const nextBoard = getNextBoard(board, sourceCoords, destinationCoords);

    const opponentKingStatus = getKingStatus(
      nextBoard,
      opponent,
      baselinePlayer
    );

    const newGameState = {
      board: baselinePlayer === "black" ? mirrorBoard(nextBoard) : nextBoard,
      turn: opponent,
      fallen: getUpdatedFallen(
        getTargetPiece(board, destinationCoords),

        gameState.fallen
      ),
      inCheck:
        opponentKingStatus === "check" ? opponent : gameState.inCheck || "",
      inCheckmate:
        opponentKingStatus === "checkmate"
          ? opponent
          : gameState.inCheckmate || ""
    };
    try {
      await firebase.updateGame(gameId, newGameState);
    } catch (err) {
      console.log(err);
    }
  }

  function performOfflineMove(a) {
    const { board } = gameState;
    const sourceCoords = a.source.droppableId;
    const destinationCoords = a.destination.droppableId;
    const nextBoard = getNextBoard(board, sourceCoords, destinationCoords);
    const opponentKingStatus = getKingStatus(nextBoard, opponent, "white");
    const newGameState = {
      ...gameState,
      board: nextBoard,
      turn: opponent,
      fallen: getUpdatedFallen(
        getTargetPiece(board, destinationCoords),
        gameState.fallen
      ),
      inCheck:
        opponentKingStatus === "check" ? opponent : gameState.inCheck || "",
      inCheckmate:
        opponentKingStatus === "checkmate"
          ? opponent
          : gameState.inCheckmate || ""
    };
    setGameState(newGameState);
  }

  function performBotMove() {
    const selectedMove = decideBotMove(getBotMoves(gameState.board));
    console.log("selectedMove", selectedMove);
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
    performOfflineMove,
    performOnlineMove,
    performBotMove,
    isUsersTurn,
    validateOfflineMove,
    validateOnlineMove,
  };
};

export default useGameState;
