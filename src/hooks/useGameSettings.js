import { useEffect, useState } from "react";
import {
  DEFAULT_TRAPDOOR_AMOUNT,
  DEFAULT_TRIVIA_CATEGORY,
  DEFAULT_TRIVIA_DIFFICULTY,
  GAME_MODES
} from "utils/constants";

import firebase from "../firebase";
import defaultBoard from "lineups/defaultBoard";

export const defaultGameSettings = {
  gameMode: "",
  gameType: "",
  trapdoorsAmount: DEFAULT_TRAPDOOR_AMOUNT,
  triviaDifficulty: DEFAULT_TRIVIA_DIFFICULTY,
  triviaCategory: DEFAULT_TRIVIA_CATEGORY,
  lineup: defaultBoard
};

const useGameSettings = () => {
  const [gameId, setGameId] = useState("");
  const [gameSettings, setGameSettings] = useState(defaultGameSettings);
  const updateGameSettings = setting => {
    setGameSettings({ ...gameSettings, ...setting });
  };

  useEffect(() => {
    const getGameSettingsFromDb = gameId => {
      firebase.getFromDatabaseListener(
        `games/${gameId}/settings`,
        gameSettings => {
          updateGameSettings({
            ...gameSettings,
            gameMode: GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME
          });
        }
      );
    };
    if (gameId) {
      getGameSettingsFromDb(gameId);
    }
    // eslint-disable-next-line
  }, [gameId]);

  return { updateGameSettings, setGameId, ...gameSettings };
};
export default useGameSettings;
