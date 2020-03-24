import React, { useContext, useEffect } from "react";
import Board from "components/board";
import { Piece } from "components/piece";
import { getPieceProps, getSquareDetails, getUrlParam } from "utils/helpers";
import useGameState from "hooks/useGameState";
import Context from "context";
import { GAME_MODES } from "utils/constants";

const Standard = () => {
  const { user, settings } = useContext(Context);
  console.log({ user });

  const { gameState, performMove, performBotMove, isUsersTurn } = useGameState({
    gameMode: settings.gameMode,
    userId: user && user.id,
    gameId: getUrlParam("game")
  });
  console.log("is users turn", isUsersTurn());
  const isOnePlayer =
    settings.gameMode === GAME_MODES.ONE_PLAYER.TECHNICAL_NAME;
  const isTwoPlayer =
    settings.gameMode === GAME_MODES.TWO_PLAYER.TECHNICAL_NAME;
  const isOnlinePlay =
    settings.gameMode === GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME;

  useEffect(() => {
    handleNextTurn();
  }, [gameState.turn]);

  function handleNextTurn() {
    if (isOnePlayer) {
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
