import React, { useContext, Fragment } from "react";
import Fallen from "components/fallen";
import Board from "components/board";
import { getOpponent } from "utils/helpers";
import { GAME_MODES } from "utils/constants";
import Context from "context";

const Game = ({
  gameState,
  getSquaresChild,
  onDrop,
  message,
  onSquareSelect
}) => {
  const { user, gameSettings } = useContext(Context);
  const { gameMode } = gameSettings;
  const { board, turn, fallen, users } = gameState;
  const isOnlinePlay = gameMode === GAME_MODES.onlinePlay.technicalName;
  const userId = user && user.id;

  const getFallen = baseline => {
    if (isOnlinePlay && users) {
      const playerColor = users[userId].color;
      return baseline ? fallen[getOpponent(playerColor)] : fallen[playerColor];
    } else {
      return baseline ? fallen.black : fallen.white;
    }
  };

  return (
    <Fragment>
      {message && <div>{message}</div>}
      <Fallen fallen={getFallen()} />
      <Board
        board={board}
        getSquaresChild={getSquaresChild}
        onDragEnd={onDrop}
        turn={turn}
        users={users}
        onSquareSelect={onSquareSelect}
      />
      <Fallen fallen={getFallen(true)} />
    </Fragment>
  );
};

export default Game;
