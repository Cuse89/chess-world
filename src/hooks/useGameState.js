import React, { useEffect, useState } from "react";
import defaultBoard from "lineups/defaultBoard";
import {
  getNextBoard,
  getOpponent,
  getTargetPiece,
  getUpdatedFallen,
  kingStatusOpponent,
  kingStatusSelf,
  performValidation
} from "utils/helpers";
import { decideBotMove, getBotMoves } from "utils/onePlayerHelpers";
import firebase from "../firebase";
import { GAME_MODES } from "utils/constants";

const useGameState = ({ gameMode, gameId, userId }) => {
  const [gameState, setGameState] = useState({
    board: defaultBoard,
    turn: "white",
    fallen: {
      white: [],
      black: []
    },
    inCheck: "",
    inCheckmate: ""
  });

  const isOnePlayer =
    gameMode === GAME_MODES.ONE_PLAYER.TECHNICAL_NAME;
  const isTwoPlayer =
    gameMode === GAME_MODES.TWO_PLAYER.TECHNICAL_NAME;
  const isOnlinePlay =
    gameMode === GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME;

  function gameListener() {
    firebase.database.ref(`games/${gameId}`).on("value", async game => {
      setGameState(game.val());
    });
  }

  function setBoard(board) {
    setGameState(prevState => ({
      ...prevState,
      board
    }));
  }

  function performMove(a) {
    const { board, turn } = gameState;
    const sourceCoords = a.source.droppableId;
    const destinationCoords = a.destination.droppableId;
    const validMove = performValidation({
      board,
      sourceCoords,
      destinationCoords,
      ownColor: "white"
    });
    console.log("turn", turn);
    const nextBoard = getNextBoard(board, sourceCoords, destinationCoords);
    const movedSelfIntoCheck = kingStatusSelf(nextBoard, turn) === "check";
    console.log({ movedSelfIntoCheck });
    const opponent = getOpponent(turn);
    const opponentKingStatus = kingStatusOpponent(nextBoard, turn);
    if (validMove && !movedSelfIntoCheck) {
      setGameState(({ board, fallen, inCheck, inCheckmate }) => {
        return {
          board: nextBoard,
          turn: opponent,
          fallen: getUpdatedFallen(
            getTargetPiece(board, destinationCoords),
            fallen
          ),
          inCheck: opponentKingStatus === "check" ? opponent : inCheck,
          inCheckmate:
            opponentKingStatus === "checkmate" ? opponent : inCheckmate
        };
      });
    }
  }

  function performBotMove() {
    const selectedMove = decideBotMove(getBotMoves(gameState.board));
    console.log("selected move", selectedMove);
    setBoard(
      getNextBoard(
        gameState.board,
        selectedMove.source.coords,
        selectedMove.destination.coords
      )
    );
  }

  function isUsersTurn() {
    if (isOnePlayer) {
      return gameState.turn === "white";
    }
    if (isOnlinePlay) {
      return gameState.turn === userId;
    }
  }

  useEffect(() => {
    console.log("gameId", gameId);
    if (gameId) {
      gameListener();
    }
  }, []);

  return { gameState, setGameState, setBoard, performMove, performBotMove, isUsersTurn };
};

export default useGameState;
