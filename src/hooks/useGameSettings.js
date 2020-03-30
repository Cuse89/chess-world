import React, { useEffect, useState } from "react";
import {
  DEFAULT_TRAPDOOR_AMOUNT,
  GAME_MODES,
  GAME_TYPES
} from "utils/constants";
import { getUrlParam } from "utils/helpers";

const useGameSettings = () => {
  const [gameSettings, setGameSettings] = useState({
    gameMode: GAME_MODES.ONE_PLAYER.TECHNICAL_NAME,
    gameType: GAME_TYPES.STANDARD.TECHNICAL_NAME,
    trapdoorAmount: DEFAULT_TRAPDOOR_AMOUNT
  });

  const updateGameSettings = setting => {
    setGameSettings({ ...gameSettings, ...setting });
  };
  useEffect(() => {
    if (getUrlParam("game")) {
      setGameSettings({
        ...gameSettings,
        gameMode: GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME
      });
    }
  }, []);

  return { updateGameSettings, ...gameSettings };
};
export default useGameSettings;
