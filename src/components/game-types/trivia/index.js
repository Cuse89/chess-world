import React, { useContext, useState, useEffect } from "react";
import Board from "components/board";
import { Piece } from "components/piece";
import {
  getOpponent,
  getPieceProps,
  getSquareDetails,
  getUrlParam
} from "utils/helpers";
import useGameState from "hooks/useGameState";
import Context from "context";
import { GAME_MODES } from "utils/constants";
import Fallen from "components/fallen";
import TriviaBox from "components/trivia-box";
import { decideBotMove, getBotMoves } from "utils/onePlayerHelpers";

const TriviaChess = ({ history }) => {
  const { user, gameSettings } = useContext(Context);
  const { gameMode, setGameId } = gameSettings;
  const gameId = getUrlParam("game");
  const userId = user && user.id;
  const [message, setMessage] = useState("");
  const [pendingMove, setPendingMove] = useState(null);

  const {
    gameState,
    canMovePiece,
    gameExists,
    validateMove,
    performMove,
    switchTurns,
    handlePerformMove
  } = useGameState({
    gameMode,
    userId,
    gameId
  });

  const isOnePlayer = gameMode === GAME_MODES.ONE_PLAYER.TECHNICAL_NAME;
  const isOnlinePlay = gameMode === GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME;
  const { board, turn, fallen, users, inCheck, inCheckmate } = gameState;

  useEffect(() => {
    if (gameId) {
      setGameId(gameId);
    }
  }, [setGameId, gameId]);

  useEffect(() => {
    const handleNextTurn = () => {
      if (isOnePlayer && turn === "black" && !inCheckmate && !pendingMove) {
        const selectedMove = decideBotMove(getBotMoves(board));
        const { source, destination } = selectedMove;
        const sourceCoords = source.coords;
        const destinationCoords = destination.coords;
        if (getSquareDetails(destinationCoords, board).pieceId) {
          setPendingMove({ sourceCoords, destinationCoords });
        } else {
          performMove(sourceCoords, destinationCoords);
        }
      }
    };
    handleNextTurn();
    // eslint-disable-next-line
  }, [turn, pendingMove]);

  useEffect(() => {
    const handleSetMessage = () => {
      let newMessage = "";
      if (inCheck) {
        newMessage = `${turn} in check`;
      }
      if (inCheckmate) {
        newMessage = `Checkmate. ${turn} wins`;
      }
      if (message !== newMessage) {
        setMessage(newMessage);
      }
    };
    handleSetMessage();
  }, [turn, inCheck, inCheckmate]);

  useEffect(() => {
    if (!gameExists) {
      history.push("/");
    }
  }, [gameExists, history]);

  function onDrop(move) {
    const sourceCoords = move.source.droppableId;
    const destinationCoords = move.destination.droppableId;
    if (validateMove(sourceCoords, destinationCoords)) {
      if (getSquareDetails(destinationCoords, board).pieceId) {
        setPendingMove({ sourceCoords, destinationCoords });
      } else {
        handlePerformMove(sourceCoords, destinationCoords);
      }
    }
  }

  function handleAnswer(correct) {
    const { sourceCoords, destinationCoords } = pendingMove;
    if (isOnePlayer && turn === "black") {
      if (correct) {
        switchTurns();
      } else {
        performMove(sourceCoords, destinationCoords);
      }
    } else {
      if (correct) {
        performMove(sourceCoords, destinationCoords);
      } else {
        switchTurns();
      }
    }
    setPendingMove(null);
  }

  function getPiece(square) {
    const { player, pieceId, inCheck } = square;
    return square.pieceId ? (
      <Piece
        key={`${player}-${pieceId}`}
        id={`${player}-${pieceId}`}
        icon={getPieceProps(pieceId).icon}
        pieceColor={player}
        inCheck={inCheck}
        available={canMovePiece(player)}
      />
    ) : null;
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
    <div>
      {message && <div>{message}</div>}
      <Fallen fallen={getFallen()} />
      <Board
        board={board}
        getSquaresChild={getPiece}
        onDragEnd={onDrop}
        turn={turn}
        users={users}
      />
      <Fallen fallen={getFallen(true)} />
      {pendingMove && (
        <TriviaBox
          onAnswerCorrect={() => handleAnswer(true)}
          onAnswerIncorrect={() => handleAnswer(false)}
        />
      )}
    </div>
  );
};

export default TriviaChess;
