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

  function handleMirroredBoard(board, blackId) {
    // if onlinePlay and player is black, mirror board from db, and also mirror back before sending back to db
    return blackId === userId ? mirrorBoard(board) : board;
  }

  function gameListener() {
    firebase.database.ref(`games/${gameId}`).on("value", async snapshot => {
      const game = snapshot.val();
      setGameState({
        ...game,
        board: handleMirroredBoard(game.board, game.users.black)
      });
    });
  }

  async function performMove(a) {
    const { board, turn } = gameState;
    const sourceCoords = a.source.droppableId;
    const destinationCoords = a.destination.droppableId;
    console.log(sourceCoords, destinationCoords, board);
    const validMove = performValidation({
      board,
      sourceCoords,
      destinationCoords,
      player: gameState.turn
    });
    const nextBoard = getNextBoard(board, sourceCoords, destinationCoords);
    const movedSelfIntoCheck = kingStatusSelf(nextBoard, turn) === "check";
    const opponent = getOpponent(turn);
    const opponentKingStatus = kingStatusOpponent(nextBoard, turn);
    if (validMove && !movedSelfIntoCheck) {
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
