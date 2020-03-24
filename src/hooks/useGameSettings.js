import React, { useEffect, useState } from "react";
import { GAME_MODES, GAME_TYPES } from "utils/constants";
import { getUrlParam } from "utils/helpers";

const useGameSettings = () => {
  const [gameMode, setGameMode] = useState(
    GAME_MODES.ONE_PLAYER.TECHNICAL_NAME
  );
  const [gameType, setGameType] = useState(GAME_TYPES.STANDARD.TECHNICAL_NAME);
  useEffect(() => {
    if (getUrlParam("game")) {
      setGameMode(GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME);
    }
  }, []);
  return { gameMode, setGameMode, gameType, setGameType };
};
export default useGameSettings;
