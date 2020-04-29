import React, { useContext } from "react";
import { GAME_MODE_HAS_GAME_TYPE, GAME_TYPES } from "utils/constants";
import DashboardButton from "components/dashboard-button";
import Context from "context";

import styles from "./SelectGameType.module.scss";

const SelectGameType = ({ onChange, gameType }) => {
  const { gameSettings } = useContext(Context);
  const { gameMode } = gameSettings;
  return (
    <div className={styles.root}>
      {GAME_MODE_HAS_GAME_TYPE[gameMode].includes(
        GAME_TYPES.standard.technicalName
      ) && (
        <DashboardButton
          onClick={() => onChange(GAME_TYPES.standard.technicalName)}
          selected={gameType === GAME_TYPES.standard.technicalName}
          faded={gameType && gameType !== GAME_TYPES.standard.technicalName}
          spaceRight
          spaceBottom
        >
          {GAME_TYPES.standard.pretty}
        </DashboardButton>
      )}
      {GAME_MODE_HAS_GAME_TYPE[gameMode].includes(
        GAME_TYPES.trapdoor.technicalName
      ) && (
        <DashboardButton
          onClick={() => onChange(GAME_TYPES.trapdoor.technicalName)}
          selected={gameType === GAME_TYPES.trapdoor.technicalName}
          faded={gameType && gameType !== GAME_TYPES.trapdoor.technicalName}
          spaceRight
          spaceBottom
        >
          {GAME_TYPES.trapdoor.pretty}
        </DashboardButton>
      )}
      {GAME_MODE_HAS_GAME_TYPE[gameMode].includes(
        GAME_TYPES.trivia.technicalName
      ) && (
        <DashboardButton
          onClick={() => onChange(GAME_TYPES.trivia.technicalName)}
          selected={gameType === GAME_TYPES.trivia.technicalName}
          faded={gameType && gameType !== GAME_TYPES.trivia.technicalName}
          spaceRight
          spaceBottom
        >
          {GAME_TYPES.trivia.pretty}
        </DashboardButton>
      )}
    </div>
  );
};

export default SelectGameType;
