import { useEffect, useState } from "react";
import {
  DEFAULT_TRAPDOOR_AMOUNT,
  GAME_MODES,
} from "utils/constants";

import firebase from "../firebase";

const useGameSettings = () => {
  const [gameId, setGameId] = useState("");
  const [gameSettings, setGameSettings] = useState({
    gameMode: "",
    gameType: "",
    trapdoorsAmount: DEFAULT_TRAPDOOR_AMOUNT
  });

  const updateGameSettings = setting => {
    setGameSettings({ ...gameSettings, ...setting });
  };

  useEffect(() => {
    const getGameSettingsFromDb = gameId => {
      firebase.getFromDatabaseListener(`games/${gameId}/settings`, gameSettings => {
        updateGameSettings({
          ...gameSettings,
          gameMode: GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME
        });
      });
    };
    if (gameId) {
      getGameSettingsFromDb(gameId);
    }
    // eslint-disable-next-line
  }, [gameId]);

  return { updateGameSettings, setGameId, ...gameSettings };
};
export default useGameSettings;
