import React, { useContext, useState, useEffect, Fragment } from "react";
import Context from "context";
import { Piece } from "components/piece";
import useGameState from "hooks/useGameState";
import { GAME_MODES } from "utils/constants";
import { getPieceProps, getUrlParam } from "utils/helpers";
import GameFooter from "components/game-footer";
import Game from "components/game";

const StandardChess = ({ history }) => {
  const { user, gameSettings, setGameId  } = useContext(Context);
  const { gameMode, boardVariant } = gameSettings;
  const gameId = getUrlParam("gameId");
  const userId = user && user.id;
  const [message, setMessage] = useState("");

  const {
    gameState,
    handlePerformMove,
    performBotMove,
    canMovePiece,
    handleGameEnded,
    removeGame
  } = useGameState({
    gameMode,
    userId,
    gameId,
    boardVariant
  });

  const isOnePlayer = gameMode === GAME_MODES.ONE_PLAYER.TECHNICAL_NAME;
  const { turn, inCheck, inCheckmate } = gameState;

  useEffect(() => {
    if (gameId) {
      setGameId(gameId);
    }
  }, [setGameId, gameId]);

  useEffect(() => {
    const handleNextTurn = () => {
      if (isOnePlayer && turn === "black" && !inCheckmate) {
        performBotMove();
      }
    };

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

    if (inCheckmate) {
      handleGameEnded();
    }
    handleNextTurn();
    handleSetMessage();
  }, [turn, inCheck, inCheckmate]);

  useEffect(() => {
    if (gameState.status === "ended") {
      history.push("/");
    }
  }, [gameState, history]);

  function onDrop(a) {
    const sourceCoords = a.source.droppableId;
    const destinationCoords = a.destination.droppableId;
    handlePerformMove(sourceCoords, destinationCoords);
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
    <Fragment>
      <Game
        gameState={gameState}
        getSquaresChild={getPiece}
        onDrop={onDrop}
        message={message}
      />
      <GameFooter resignGame={removeGame} />
    </Fragment>
  );
};

export default StandardChess;
