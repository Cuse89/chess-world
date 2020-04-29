import { useEffect, useState } from "react";
import {
  BOARDS,
  DEFAULT_TRAPDOOR_AMOUNT,
  DEFAULT_TRIVIA_CATEGORY,
  DEFAULT_TRIVIA_DIFFICULTY,
  GAME_MODES,
  GAME_TYPES
} from "utils/constants";

import firebase from "../firebase";
import { getUrlParam } from "utils/helpers";

export const defaultGameSettings = {
  gameMode: getUrlParam("gameMode") || "",
  gameType: getUrlParam("gameType") || "",
  boardVariant: getUrlParam("boardVariant") || BOARDS.default.technicalName,
  trapdoorsAmount: getUrlParam("trapdoorsAmount") || DEFAULT_TRAPDOOR_AMOUNT,
  triviaDifficulty:
    getUrlParam("triviaDifficulty") || DEFAULT_TRIVIA_DIFFICULTY,
  triviaCategory: getUrlParam("triviaCategory") || DEFAULT_TRIVIA_CATEGORY
};

const useGameSettings = () => {
  const [gameId, setGameId] = useState("");
  const [gameSettings, setGameSettings] = useState(defaultGameSettings);
  const {
    gameMode,
    gameType,
    boardVariant,
    trapdoorsAmount,
    triviaCategory,
    triviaDifficulty
  } = gameSettings;

  const updateGameSettings = setting => {
    setGameSettings({ ...gameSettings, ...setting });
  };

  useEffect(() => {
    const getGameSettingsFromDb = gameId => {
      firebase.getFromDatabaseListener(`games/${gameId}`, gameSettings => {
        updateGameSettings({
          ...gameSettings,
          gameMode: GAME_MODES.onlinePlay.technicalName
        });
      });
    };
    if (gameId) {
      getGameSettingsFromDb(gameId);
    }
    // eslint-disable-next-line
  }, [gameId]);

  function getGameTypeSpecificSettings() {
    if (gameType === GAME_TYPES.trapdoor.technicalName) {
      return { trapdoorsAmount };
    }
    if (gameType === GAME_TYPES.trivia.technicalName) {
      return { triviaCategory, triviaDifficulty };
    }
  }

  return {
    updateGameSettings,
    setGameId,
    gameSettings: {
      gameMode,
      gameType,
      boardVariant,
      ...getGameTypeSpecificSettings()
    }
  };
};
export default useGameSettings;
