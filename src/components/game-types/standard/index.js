import React, { useContext, useEffect } from "react";
import Board from "components/board";
import { Piece } from "components/piece";
import { getPieceProps, getSquareDetails } from "utils/helpers";
import useGameState from "hooks/useGameState";
import Context from "context";

const Standard = () => {
  const { user, settings } = useContext(Context);
  const { gameState, performMove, performBotMove } = useGameState();

  useEffect(() => {
    handleNextTurn();
  }, [gameState.turn]);

  function handleNextTurn() {
    if (settings.gameMode === "onePlayer") {
      performBotMove();
    }
  }

  function getStandardSquaresChild(coords) {
    const square = getSquareDetails(coords, gameState.board);
    const { player, pieceId, inCheck } = square;

    return square.pieceId ? (
      <Piece
        key={`${player}-${pieceId}`}
        className={`${player}-${pieceId}`}
        icon={getPieceProps(pieceId).icon}
        pieceColour={player}
        inCheck={inCheck}
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