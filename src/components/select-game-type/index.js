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
        GAME_TYPES.STANDARD.TECHNICAL_NAME
      ) && (
        <DashboardButton
          displayText={GAME_TYPES.STANDARD.PRETTY}
          onClick={() => onChange(GAME_TYPES.STANDARD.TECHNICAL_NAME)}
          selected={gameType === GAME_TYPES.STANDARD.TECHNICAL_NAME}
          faded={gameType && gameType !== GAME_TYPES.STANDARD.TECHNICAL_NAME}
          spaceRight
          spaceBottom
        />
      )}
      {GAME_MODE_HAS_GAME_TYPE[gameMode].includes(
        GAME_TYPES.TRAPDOOR.TECHNICAL_NAME
      ) && (
        <DashboardButton
          displayText={GAME_TYPES.TRAPDOOR.PRETTY}
          onClick={() => onChange(GAME_TYPES.TRAPDOOR.TECHNICAL_NAME)}
          selected={gameType === GAME_TYPES.TRAPDOOR.TECHNICAL_NAME}
          faded={gameType && gameType !== GAME_TYPES.TRAPDOOR.TECHNICAL_NAME}
          spaceRight
          spaceBottom
        />
      )}
      {GAME_MODE_HAS_GAME_TYPE[gameMode].includes(
        GAME_TYPES.TRIVIA.TECHNICAL_NAME
      ) && (
        <DashboardButton
          displayText={GAME_TYPES.TRIVIA.PRETTY}
          onClick={() => onChange(GAME_TYPES.TRIVIA.TECHNICAL_NAME)}
          selected={gameType === GAME_TYPES.TRIVIA.TECHNICAL_NAME}
          faded={gameType && gameType !== GAME_TYPES.TRIVIA.TECHNICAL_NAME}
          spaceRight
          spaceBottom
        />
      )}
    </div>
  );
};

export default SelectGameType;
