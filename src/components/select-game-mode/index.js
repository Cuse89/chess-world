import React from "react";
import DashboardButton from "components/dashboard-button";
import { GAME_MODES } from "utils/constants";
import styles from "./SelectGameMode.module.scss";

const SelectGameMode = ({ onGameModeClick, gameMode }) => (
  <div className={styles.root}>
    <div className={styles.selects}>
      <DashboardButton
        onClick={() => onGameModeClick(GAME_MODES.onePlayer.technicalName)}
        selected={gameMode === GAME_MODES.onePlayer.technicalName}
        spaceRight
        spaceBottom
        faded={gameMode && gameMode !== GAME_MODES.onePlayer.technicalName}
      >
        {GAME_MODES.onePlayer.pretty}
      </DashboardButton>
      <DashboardButton
        onClick={() => onGameModeClick(GAME_MODES.twoPlayer.technicalName)}
        selected={gameMode === GAME_MODES.twoPlayer.technicalName}
        spaceRight
        spaceBottom
        faded={gameMode && gameMode !== GAME_MODES.twoPlayer.technicalName}
      >
        {GAME_MODES.twoPlayer.pretty}
      </DashboardButton>
      <DashboardButton
        onClick={() => onGameModeClick(GAME_MODES.onlinePlay.technicalName)}
        selected={gameMode === GAME_MODES.onlinePlay.technicalName}
        spaceRight
        spaceBottom
        faded={gameMode && gameMode !== GAME_MODES.onlinePlay.technicalName}
      >
        {GAME_MODES.onlinePlay.pretty}
      </DashboardButton>
    </div>
  </div>
);

export default SelectGameMode;
