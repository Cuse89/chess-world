import React, { useContext } from "react";
import {
  GAME_MODES,
  GAME_TYPES
} from "utils/constants";
import DashboardButton from "components/dashboard-button";
import Context from "context";

import styles from "./SelectGameType.module.scss";

const SelectGameType = ({ onChange, selectedGameType }) => {
  const { gameSettings } = useContext(Context);
  const { gameMode } = gameSettings;
  const getButton = gameType => {
    if (
      !(
        GAME_MODES[gameMode].doesNotUseGameType &&
        GAME_MODES[gameMode].doesNotUseGameType.includes(gameType)
      )
    ) {
      return (
        <DashboardButton
          key={gameType}
          onClick={() => onChange(GAME_TYPES[gameType].technicalName)}
          selected={selectedGameType === GAME_TYPES[gameType].technicalName}
          faded={
            selectedGameType &&
            selectedGameType !== GAME_TYPES[gameType].technicalName
          }
          spaceRight
          spaceBottom
        >
          {GAME_TYPES[gameType].pretty}
        </DashboardButton>
      );
    }
  };
  return (
    <div className={styles.root}>
      {Object.keys(GAME_TYPES).map(gameType => getButton(gameType))}
    </div>
  );
};

export default SelectGameType;
