import { useEffect, useState } from "react";
import {
  DEFAULT_TRAPDOOR_AMOUNT,
  GAME_MODES,
  GAME_TYPES
} from "utils/constants";

import firebase from "../firebase";

const useGameSettings = () => {
  const [gameId, setGameId] = useState("");
  const [gameSettings, setGameSettings] = useState({
    gameMode: GAME_MODES.ONE_PLAYER.TECHNICAL_NAME,
    gameType: GAME_TYPES.STANDARD.TECHNICAL_NAME,
    trapdoorsAmount: DEFAULT_TRAPDOOR_AMOUNT
  });

  const updateGameSettings = setting => {
    setGameSettings({ ...gameSettings, ...setting });
  };

  useEffect(() => {
    const getGameSettingsFromDb = gameId => {
      firebase.database
        .ref(`games/${gameId}/settings`)
        .on("value", snapshot => {
          updateGameSettings({
            ...snapshot.val(),
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
