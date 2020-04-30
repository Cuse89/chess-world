import React from "react";
import { GAME_SETTINGS } from "utils/constants";

import styles from "./GameSettings.module.scss";

const GameSettings = ({ settings }) => {
  const getPretty = (key, value) => {
    switch (key) {
      case "gameType":
        return GAME_SETTINGS.gameType.options[value].pretty;
      case "boardVariant":
        return GAME_SETTINGS.boardVariant.options[value].pretty;
      case "trapdoorsAmount":
        return value;
      case "triviaCategory":
        return GAME_SETTINGS.triviaCategory.options.filter(
          category => category.id === value
        )[0].pretty;
      case "triviaDifficulty":
        return GAME_SETTINGS.triviaDifficulty.options.filter(
          category => category.technicalName === value
        )[0].pretty;
      default:
        return "";
    }
  };

  const getSetting = setting => {
    const prettyText = getPretty(setting, settings[setting]);
    if (prettyText) {
      return (
        <div key={setting} className={styles.setting}>
          {GAME_SETTINGS[setting] && GAME_SETTINGS[setting].pretty}:{" "}
          <b>{prettyText}</b>
        </div>
      );
    }
  };

  return (
    <div className={styles.root}>
      {Object.keys(settings).map(setting => getSetting(setting))}
    </div>
  );
};

export default GameSettings;
