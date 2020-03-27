import React from "react";
import DashboardButton from "components/dashboard-button";
import { GAME_MODES } from "utils/constants";
import styles from "./SelectGameMode.module.scss"

const SelectGameMode = ({ onGameModeClick }) => (
  <div className={styles.root}>
      <h3>Select game mode</h3>
      <div className={styles.selects}>
          <DashboardButton
            displayText={GAME_MODES.ONE_PLAYER.PRETTY}
            onClick={() => onGameModeClick(GAME_MODES.ONE_PLAYER.TECHNICAL_NAME)}
            spaceRight
          />
          <DashboardButton
            displayText={GAME_MODES.TWO_PLAYER.PRETTY}
            onClick={() => onGameModeClick(GAME_MODES.TWO_PLAYER.TECHNICAL_NAME)}
            spaceRight
          />
          <DashboardButton
            displayText={GAME_MODES.ONLINE_PLAY.PRETTY}
            onClick={() => onGameModeClick(GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME)}
            spaceRight
          />
      </div>

  </div>
);

export default SelectGameMode;
