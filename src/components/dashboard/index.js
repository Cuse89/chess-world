import React, { useContext } from "react";

import SelectGameMode from "components/select-game-mode";
import CreateGame from "components/create-game";
import { GAME_MODES } from "utils/constants";
import Context from "context";
import DashboardOnline from "components/dashboard-online";
import { createUrlParams } from "utils/helpers";

import styles from "./Dashboard.module.scss";

const Dashboard = ({ history }) => {
  const { gameSettings, updateGameSettings } = useContext(Context);
  const { gameMode } = gameSettings;

  const onGameModeClick = gameMode => {
    updateGameSettings({ gameMode, gameType: "" });
  };

  const onCreateGameSubmit = gameSettings => {
    history.push(
      `/${gameSettings.gameType}?${createUrlParams({
        ...gameSettings,
        gameMode
      })}`
    );
  };

  return (
    <div className={styles.root}>
      <SelectGameMode
        onGameModeClick={onGameModeClick}
        gameMode={gameSettings.gameMode}
      />
      {gameMode === GAME_MODES.onlinePlay.technicalName && <DashboardOnline />}
      {gameMode !== GAME_MODES.onlinePlay.technicalName && gameMode !== "" && (
        <CreateGame
          onSubmit={onCreateGameSubmit}
          submitText="Play game!"
          onSettingChange={updateGameSettings}
          gameSettings={gameSettings}
        />
      )}
    </div>
  );
};

export default Dashboard;
