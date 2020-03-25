import React, { useContext, useEffect } from "react";
import Board from "components/board";
import { Piece } from "components/piece";
import {
  getPieceProps,
  getSquareDetails,
  getUrlParam,
} from "utils/helpers";
import useGameState from "hooks/useGameState";
import Context from "context";
import { GAME_MODES } from "utils/constants";

const Standard = () => {
  const { user, settings } = useContext(Context);
  const { gameMode } = settings;
  const userId = user && user.id;

  const { gameState, performMove, performBotMove, isUsersTurn } = useGameState({
    gameMode,
    userId,
    gameId: getUrlParam("game")
  });

  const isOnePlayer = gameMode === GAME_MODES.ONE_PLAYER.TECHNICAL_NAME;
  const isTwoPlayer = gameMode === GAME_MODES.TWO_PLAYER.TECHNICAL_NAME;
  const isOnlinePlay = gameMode === GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME;

  useEffect(() => {
    handleNextTurn();
  }, [gameState.turn]);

  function handleNextTurn() {
    if (isOnePlayer && gameState.turn === "black") {
      performBotMove();
    }
  }

  function getStandardSquaresChild(square) {
    const { player, pieceId, inCheck } = square;
    return square.pieceId ? (
      <Piece
        key={`${player}-${pieceId}`}
        className={`${player}-${pieceId}`}
        icon={getPieceProps(pieceId).icon}
        pieceColour={player}
        inCheck={inCheck}
        available={isUsersTurn()}
      />
    ) : null;
  }

  return (
    <div>
      <Board
        board={gameState.board}
        getSquaresChild={getStandardSquaresChild}
        onDragEnd={performMove}
      />
    </div>
  );
};

export default Standard;
