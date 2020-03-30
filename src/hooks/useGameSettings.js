import React, { useEffect, useState } from "react";
import {
  DEFAULT_TRAPDOOR_AMOUNT,
  GAME_MODES,
  GAME_TYPES
} from "utils/constants";
import { getUrlParam } from "utils/helpers";
import firebase from "../firebase";

const useGameSettings = () => {
  const [gameSettings, setGameSettings] = useState({
    gameMode: GAME_MODES.ONE_PLAYER.TECHNICAL_NAME,
    gameType: GAME_TYPES.STANDARD.TECHNICAL_NAME,
    trapdoorsAmount: DEFAULT_TRAPDOOR_AMOUNT
  });

  const updateGameSettings = setting => {
    setGameSettings({ ...gameSettings, ...setting });
  };

  const getGameSettingsFromDb = gameId => {
    firebase.database.ref(`games/${gameId}/settings`).on("value", snapshot => {
      updateGameSettings({ ...snapshot.val() });
    });
  };

  useEffect(() => {
    const gameId = getUrlParam("game");
    if (gameId) {
      getGameSettingsFromDb(gameId);
    }
  }, []);

  return { updateGameSettings, ...gameSettings };
};
export default useGameSettings;
