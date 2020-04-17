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

const CreateGame = ({ onSubmit, submitText }) => {
  const {
    updateGameSettings,
    gameType,
    trapdoorsAmount,
    triviaDifficulty,
    triviaCategory,
    lineup
  } = useGameSettings();
  const handleOnSubmit = () => {
    onSubmit({
      gameType,
      trapdoorsAmount,
      triviaDifficulty,
      triviaCategory,
      lineup
    });
  };

  return (
    <div>
      <SelectGameType
        onChange={gameType => updateGameSettings({ gameType })}
        gameType={gameType}
      />
      {gameType && (
        <BoardOptions onChange={updateGameSettings} selectedBoard={lineup} />
      )}
      {gameType === GAME_TYPES.TRAPDOOR.TECHNICAL_NAME && (
        <TrapdoorOptions
          onChange={updateGameSettings}
          trapdoorsAmount={trapdoorsAmount}
        />
      )}
      {gameType === GAME_TYPES.TRIVIA.TECHNICAL_NAME && (
        <TriviaOptions
          onChange={updateGameSettings}
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
