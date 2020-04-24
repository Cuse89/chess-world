import { useEffect, useState } from "react";
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
import { BOARDS, DEFAULT_FALLEN, DEFAULT_TURN, GAME_MODES } from "utils/constants";
import { getKingStatus } from "piece-validation/getKingStatus";

const useGameState = ({ gameMode, gameId, userId, boardVariant }) => {

  const [gameState, setGameState] = useState({
    board: BOARDS[boardVariant].board,
    turn: DEFAULT_TURN,
    fallen: DEFAULT_FALLEN,
    inCheck: "",
    inCheckmate: "",
    status: "ready"
  });

  console.log({ gameState });

  const {
    board,
    turn,
    fallen,
    users,
    inCheckmate
  } = gameState;

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
    } else {
      navigator.vibrate([100, 50, 100]);
    }
  }

  function validateMove(sourceCoords, destinationCoords) {
    return performValidation({
      board,
      boardVariant,
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
      baselinePlayer,
      boardVariant
    );

    return {
      ...gameState,
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
    const selectedMove = decideBotMove(getBotMoves(board, boardVariant));
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

  async function handleGameEnded() {
    navigator.vibrate([1000, 300, 1000]);
    if (isOnlinePlay) {
      const lostGame = users[userId].color === inCheckmate;
      const user = await firebase.getFromDatabaseOnce(
        `users/${userId}`,
        user => user
      );
      const gamesWon = user.gameStats ? user.gameStats.won : 0;
      const gamesLost = user.gameStats ? user.gameStats.lost : 0;
      try {
        // remove game from user
        await firebase.updateUser(userId, "games", { [gameId]: null });
        // update wins or losses
        await firebase.updateUser(userId, "gameStats", {
          played: user.gameStats ? user.gameStats.played + 1 : 1,
          won: lostGame ? gamesWon : gamesWon + 1,
          lost: lostGame ? gamesLost + 1 : gamesLost
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    const gameListener = () => {
      firebase.getFromDatabaseListener(`games/${gameId}`, game => {
        if (game) {
          setGameState({
            ...game,
            board:
              game.users[userId].color === "black"
                ? mirrorBoard(game.board)
                : game.board,
            boardVariant: game.boardVariant,
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
          setGameState({ ...gameState, status: "ended" });
        }
      });
    };

    if (gameId && userId && isOnlinePlay) {
      gameListener();
    }

    return () => firebase.listenerUnsubscribe(`games/${gameId}`);
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
    switchTurns,
    handleGameEnded
  };
};

export default useGameState;
