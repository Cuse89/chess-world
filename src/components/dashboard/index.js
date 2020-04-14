import React, { useContext, useState } from "react";

import SelectGameMode from "components/select-game-mode";
import CreateGame from "components/create-game";
import { GAME_MODES } from "utils/constants";
import Context from "context";
import DashboardOnline from "components/dashboard-online";

import styles from "./Dashboard.module.scss";

const Dashboard = ({ history }) => {
  const { gameSettings } = useContext(Context);
  const { gameMode } = gameSettings;
  const { updateGameSettings } = gameSettings;

  const onGameModeClick = gameMode => {
    updateGameSettings({ gameMode, gameType: "" });
  };

  const onCreateGameSubmit = settings => {
    updateGameSettings(settings);
    history.push(`/${settings.gameType}`);
  };

  return (
    <div className={styles.root}>
      <SelectGameMode
        onGameModeClick={onGameModeClick}
        gameMode={gameSettings.gameMode}
      />
      {gameMode === GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME && (
        <DashboardOnline />
      )}
      {gameMode !== GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME &&
        gameMode !== "" && (
          <CreateGame onSubmit={onCreateGameSubmit} submitText="Play game!" />
        )}
    </div>
  );
};

export default Dashboard;
