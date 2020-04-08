import { useEffect, useState } from "react";
import defaultBoard from "lineups/defaultBoard";
import {
  getNextBoard,
  getOpponent,
  getTargetPiece,
  getUpdatedBoard,
  getUpdatedFallen,
  mirrorBoard,
  performValidation
} from "utils/helpers";
import { decideBotMove, getBotMoves } from "utils/onePlayerHelpers";
import firebase from "../firebase";
import { DEFAULT_FALLEN, DEFAULT_TURN, GAME_MODES } from "utils/constants";
import { getKingStatus } from "piece-validation/getKingStatus";

const useGameState = ({ gameMode, gameId, userId }) => {
  const [gameState, setGameState] = useState({
    board: defaultBoard,
    turn: DEFAULT_TURN,
    fallen: DEFAULT_FALLEN,
    inCheck: "",
    inCheckmate: ""
  });

  console.log({ gameState });

  const [gameExists, setGameExists] = useState(true);

  const { board, turn, fallen, users } = gameState;

  const isOnePlayer = gameMode === GAME_MODES.ONE_PLAYER.TECHNICAL_NAME;
  const isTwoPlayer = gameMode === GAME_MODES.TWO_PLAYER.TECHNICAL_NAME;
  const isOnlinePlay = gameMode === GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME;
  const opponent = getOpponent(turn);
  const playerColorOnline = users && users[userId].color;
  const baselinePlayer =
    isOnePlayer || isTwoPlayer ? "white" : playerColorOnline;

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
    const opponentKingStatus = getKingStatus(
      nextBoard,
      opponent,
      baselinePlayer
    );

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
    const boardCopy = getUpdatedBoard(board, coords, value);
    updateBoard(boardCopy);
  }

  function handleMirroredBoard(board) {
    return baselinePlayer === "black" ? mirrorBoard(board) : board;
  }

  function updateBoard(newBoard) {
    if (isOnlinePlay) {
      firebase.updateGame(gameId, { board: handleMirroredBoard(newBoard) });
    } else {
      setGameState({ ...gameState, board: newBoard });
    }
  }

  async function switchTurns() {
    const newGameState = {
      ...gameState,
      board: handleMirroredBoard(board),
      turn: getOpponent(turn)
    };
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

  useEffect(() => {
    const gameListener = () => {
      if (isOnlinePlay) {
        firebase.getFromDatabaseListener(`games/${gameId}`, game => {
          if (game) {
            setGameState({
              ...game,
              board:
                game.users[userId].color === "black"
                  ? mirrorBoard(game.board)
                  : game.board,
              fallen: game.fallen
                ? {
                    black: game.fallen.black || [],
                    white: game.fallen.white || []
                  }
                : DEFAULT_FALLEN,
              users: game.users,
              inCheck: game.inCheck,
              inCheckmate: game.inCheckmate
            });
          } else {
            console.log("game doesnt exist");
            setGameExists(false);
          }
        });
      }
    };
    if (gameId && userId) {
      gameListener();
    }
  }, [gameId, userId, isOnlinePlay]);

  return {
    gameState,
    setGameState,
    handlePerformMove,
    validateMove,
    performBotMove,
    canMovePiece,
    updateSquare,
    performMove,
    updateBoard,
    gameExists,
    switchTurns
  };
};

export default useGameState;
