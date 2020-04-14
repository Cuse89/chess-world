import React from "react";
import DashboardButton from "components/dashboard-button";
import { GAME_MODES } from "utils/constants";
import styles from "./SelectGameMode.module.scss";

const SelectGameMode = ({ onGameModeClick, gameMode }) => (
  <div className={styles.root}>
    <div className={styles.selects}>
      <DashboardButton
        onClick={() => onGameModeClick(GAME_MODES.ONE_PLAYER.TECHNICAL_NAME)}
        selected={gameMode === GAME_MODES.ONE_PLAYER.TECHNICAL_NAME}
        spaceRight
        spaceBottom
        faded={gameMode && gameMode !== GAME_MODES.ONE_PLAYER.TECHNICAL_NAME}
      >
        {GAME_MODES.ONE_PLAYER.PRETTY}
      </DashboardButton>
      <DashboardButton
        onClick={() => onGameModeClick(GAME_MODES.TWO_PLAYER.TECHNICAL_NAME)}
        selected={gameMode === GAME_MODES.TWO_PLAYER.TECHNICAL_NAME}
        spaceRight
        spaceBottom
        faded={gameMode && gameMode !== GAME_MODES.TWO_PLAYER.TECHNICAL_NAME}
      >
        {GAME_MODES.TWO_PLAYER.PRETTY}
      </DashboardButton>
      <DashboardButton
        onClick={() => onGameModeClick(GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME)}
        selected={gameMode === GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME}
        spaceRight
        spaceBottom
        faded={gameMode && gameMode !== GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME}
      >
        {GAME_MODES.ONLINE_PLAY.PRETTY}
      </DashboardButton>
    </div>
  </div>
);

export default SelectGameMode;
