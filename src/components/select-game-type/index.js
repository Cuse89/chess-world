import React from "react";
import { GAME_TYPES } from "utils/constants";
import DashboardButton from "components/dashboard-button";

import styles from "./SelectGameType.module.scss";

const SelectGameType = ({ onChange, gameType }) => (
  <div className={styles.root}>
    <DashboardButton
      displayText={GAME_TYPES.STANDARD.PRETTY}
      onClick={() => onChange(GAME_TYPES.STANDARD.TECHNICAL_NAME)}
      selected={gameType === GAME_TYPES.STANDARD.TECHNICAL_NAME}
      fullLength
      spaceRight
      spaceBottom
    />
    <DashboardButton
      displayText={GAME_TYPES.TRAPDOOR.PRETTY}
      onClick={() => onChange(GAME_TYPES.TRAPDOOR.TECHNICAL_NAME)}
      selected={gameType === GAME_TYPES.TRAPDOOR.TECHNICAL_NAME}
      fullLength
      spaceRight
      spaceBottom
    />
    <DashboardButton
      displayText={GAME_TYPES.TRIVIA.PRETTY}
      onClick={() => onChange(GAME_TYPES.TRIVIA.TECHNICAL_NAME)}
      selected={gameType === GAME_TYPES.TRIVIA.TECHNICAL_NAME}
      fullLength
      spaceRight
      spaceBottom
    />
  </div>
);

export default SelectGameType;
