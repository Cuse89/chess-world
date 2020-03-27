import React, { useEffect, useState } from "react";
import Swiper from "components/Swiper";
import { GAME_TYPES } from "utils/constants";
import DashboardButton from "components/dashboard-button";

import styles from "./SelectGameType.module.scss";

const SelectGameType = ({ onChange, useSwiper }) => {
  const [gameType, setGameType] = useState(GAME_TYPES.STANDARD.TECHNICAL_NAME);

  useEffect(() => {
    onChange(gameType);
  }, [gameType]);

  const standard = {
    val: GAME_TYPES.STANDARD.TECHNICAL_NAME,
    pretty: GAME_TYPES.STANDARD.PRETTY
  };
  const trapdoor = {
    val: GAME_TYPES.TRAPDOOR.TECHNICAL_NAME,
    pretty: GAME_TYPES.TRAPDOOR.PRETTY
  };
  const trivia = {
    val: GAME_TYPES.TRIVIA.TECHNICAL_NAME,
    pretty: GAME_TYPES.TRIVIA.PRETTY
  };
  // needs at least 4 for some reason else ReactSwipe breaks
  let gameTypes = [standard, trapdoor, trivia, standard, trapdoor, trivia];

  return (
    <div>
      {useSwiper && <Swiper options={gameTypes} handleNav={setGameType} />}
      {!useSwiper && (
        <div className={styles.compact}>
          <DashboardButton
            displayText={GAME_TYPES.STANDARD.PRETTY}
            onClick={() => setGameType(GAME_TYPES.STANDARD.TECHNICAL_NAME)}
            selected={gameType === GAME_TYPES.STANDARD.TECHNICAL_NAME}
            fullLength
            spaceRight
            spaceBottom
          />
          <DashboardButton
            displayText={GAME_TYPES.TRAPDOOR.PRETTY}
            onClick={() => setGameType(GAME_TYPES.TRAPDOOR.TECHNICAL_NAME)}
            selected={gameType === GAME_TYPES.TRAPDOOR.TECHNICAL_NAME}
            fullLength
            spaceRight
            spaceBottom
          />
          <DashboardButton
            displayText={GAME_TYPES.TRIVIA.PRETTY}
            onClick={() => setGameType(GAME_TYPES.TRIVIA.TECHNICAL_NAME)}
            selected={gameType === GAME_TYPES.TRIVIA.TECHNICAL_NAME}
            fullLength
            spaceRight
            spaceBottom
          />
        </div>
      )}
    </div>
  );
};

export default SelectGameType;
