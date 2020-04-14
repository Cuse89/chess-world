import React from "react";
import DashboardButton from "components/dashboard-button";
import { GAME_MODES } from "utils/constants";
import styles from "./SelectGameMode.module.scss";

const SelectGameMode = ({ onGameModeClick, gameMode }) => (
  <div className={styles.root}>
    <div className={styles.selects}>
      <DashboardButton
        displayText={GAME_MODES.ONE_PLAYER.PRETTY}
        onClick={() => onGameModeClick(GAME_MODES.ONE_PLAYER.TECHNICAL_NAME)}
        selected={gameMode === GAME_MODES.ONE_PLAYER.TECHNICAL_NAME}
        spaceRight
        spaceBottom
        faded={gameMode && gameMode !== GAME_MODES.ONE_PLAYER.TECHNICAL_NAME}
      />
      <DashboardButton
        displayText={GAME_MODES.TWO_PLAYER.PRETTY}
        onClick={() => onGameModeClick(GAME_MODES.TWO_PLAYER.TECHNICAL_NAME)}
        selected={gameMode === GAME_MODES.TWO_PLAYER.TECHNICAL_NAME}
        spaceRight
        spaceBottom
        faded={gameMode && gameMode !== GAME_MODES.TWO_PLAYER.TECHNICAL_NAME}
      />
      <DashboardButton
        displayText={GAME_MODES.ONLINE_PLAY.PRETTY}
        onClick={() => onGameModeClick(GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME)}
        selected={gameMode === GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME}
        spaceRight
        spaceBottom
        faded={gameMode && gameMode !== GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME}
      />
    </div>
  </div>
);

export default SelectGameMode;
