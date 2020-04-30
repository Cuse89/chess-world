import React from "react";
import PropTypes from "prop-types";
import SelectGameType from "components/select-game-type";
import DashboardButton from "components/dashboard-button";
import useGameSettings from "hooks/useGameSettings";
import { GAME_TYPES } from "utils/constants";
import TrapdoorOptions from "components/create-game/trapdoor-options";
import TriviaOptions from "components/create-game/trivia-options";
import BoardOptions from "components/create-game/board-options";
import styles from "./CreateGame.module.scss";

const CreateGame = ({
  onSubmit,
  submitText,
  onSettingChange,
  gameSettings
}) => {
  const {
    gameType,
    trapdoorsAmount,
    triviaDifficulty,
    triviaCategory,
    boardVariant
  } = gameSettings;
  const handleOnSubmit = () => {
    onSubmit(gameSettings);
  };

  return (
    <div>
      <SelectGameType
        onChange={gameType => onSettingChange({ gameType })}
        selectedGameType={gameType}
      />
      {gameType && (
        <BoardOptions
          onChange={onSettingChange}
          selectedBoard={boardVariant}
          gameType={gameType}
        />
      )}
      {gameType === GAME_TYPES.trapdoor.technicalName && (
        <TrapdoorOptions
          onChange={onSettingChange}
          trapdoorsAmount={trapdoorsAmount}
        />
      )}
      {gameType === GAME_TYPES.trivia.technicalName && (
        <TriviaOptions
          onChange={onSettingChange}
          triviaDifficulty={triviaDifficulty}
          triviaCategory={triviaCategory}
        />
      )}
      {gameType && (
        <DashboardButton
          onClick={handleOnSubmit}
          fullLength
          type="warning"
          className={styles.submit}
        >
          {submitText}
        </DashboardButton>
      )}
    </div>
  );
};

CreateGame.defaultProps = {
  useCompact: true,
  submitText: "Submit"
};

CreateGame.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  useCompact: PropTypes.bool,
  submitText: PropTypes.string
};

export default CreateGame;
