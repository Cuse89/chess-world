import React, { useState } from "react";
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

const useGameState = () => {
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
    const nextBoard = getNextBoard(board, sourceCoords, destinationCoords);
    const movedSelfIntoCheck = kingStatusSelf(nextBoard, turn) === "check";
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

  return { gameState, setGameState, setBoard, performMove, performBotMove };
};

export default useGameState;
