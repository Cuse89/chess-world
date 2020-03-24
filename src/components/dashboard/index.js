import React, { useContext, useState } from "react";

import SelectGameMode from "components/select-game-mode";
import CreateGame from "components/create-game";
import { GAME_MODES } from "utils/constants";
import Context from "context"

const Dashboard = ({ history }) => {
  const { settings } = useContext(Context);
  const { setGameMode, gameType } = settings;
  const [showSelectGameMode, toggleShowSelectGameMode] = useState(true);
  const [showCreateGame, toggleShowCreateGame] = useState(false);

  const onGameModeClick = gameMode => {
    setGameMode(gameMode);

    if (gameMode === GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME) {
      history.push("/dashboard/online");
    } else {
      toggleShowCreateGame(prevState => !prevState);
      toggleShowSelectGameMode(prevState => !prevState);
    }
  };

  const joinGame = () => {
    history.push(`/${gameType}`);
  };
  return (
    <div>
      {showSelectGameMode && (
        <SelectGameMode history={history} onGameModeClick={onGameModeClick} />
      )}
      {showCreateGame && <CreateGame onSubmit={joinGame} />}
    </div>
  );
};

export default Dashboard;
