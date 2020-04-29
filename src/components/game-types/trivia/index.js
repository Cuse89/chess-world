import React, { useContext, useState, useEffect } from "react";
import { Piece } from "components/piece";
import { getPieceProps, getSquareDetails, getUrlParam } from "utils/helpers";
import useGameState from "hooks/useGameState";
import Context from "context";
import { GAME_MODES } from "utils/constants";
import TriviaBox from "components/trivia-box";
import { decideBotMove, getBotMoves } from "utils/onePlayerHelpers";
import Game from "components/game";
import GameFooter from "components/game-footer";

const TriviaChess = ({ history }) => {
  const { user, gameSettings, setGameId } = useContext(Context);
  const {
    gameMode,
    triviaDifficulty,
    triviaCategory,
    boardVariant
  } = gameSettings;
  console.log("trivia gameSettings", gameSettings)
  const gameId = getUrlParam("gameId");
  const userId = user && user.id;
  const [message, setMessage] = useState("");
  const [pendingMove, setPendingMove] = useState(null);

  const {
    gameState,
    canMovePiece,
    validateMove,
    performMove,
    switchTurns,
    handlePerformMove,
    handleGameEnded,
    removeGame
  } = useGameState({
    gameMode,
    userId,
    gameId,
    boardVariant
  });

  const isOnePlayer = gameMode === GAME_MODES.onePlayer.technicalName;
  const { board, turn, inCheck, inCheckmate } = gameState;

  useEffect(() => {
    if (gameId) {
      setGameId(gameId);
    }
  }, [setGameId, gameId]);

  useEffect(() => {
    const handleNextTurn = () => {
      if (isOnePlayer && turn === "black" && !inCheckmate && !pendingMove) {
        const selectedMove = decideBotMove(getBotMoves(board, boardVariant));
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
    if (inCheckmate) {
      handleGameEnded();
    }
  }, [turn, inCheck, inCheckmate]);

  useEffect(() => {
    if (gameState.status === "ended") {
      history.push("/");
    }
  }, [gameState, history]);

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

  return (
    <div>
      <Game
        gameState={gameState}
        getSquaresChild={getPiece}
        onDrop={onDrop}
        message={message}
      />
      {pendingMove && (
        <TriviaBox
          difficulty={triviaDifficulty}
          category={triviaCategory}
          onAnswerCorrect={() => handleAnswer(true)}
          onAnswerIncorrect={() => handleAnswer(false)}
        />
      )}
      <GameFooter resignGame={removeGame} />
    </div>
  );
};

export default TriviaChess;
