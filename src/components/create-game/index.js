import React from "react";
import PropTypes from "prop-types";
import SelectGameType from "components/select-game-type";
import DashboardButton from "components/dashboard-button";
import useGameSettings from "hooks/useGameSettings";
import { GAME_TYPES } from "utils/constants";
import TrapdoorOptions from "components/create-game/trapdoor";

import styles from "./CreateGame.module.scss";

const CreateGame = ({ onSubmit, noHeader, submitText }) => {
  const { updateGameSettings, gameType, trapdoorsAmount } = useGameSettings();
  const handleOnSubmit = () => {
    onSubmit({ gameType, trapdoorsAmount });
  };

  return (
    <div className={styles.root}>
      {!noHeader && <h3>Create your game</h3>}
      <SelectGameType
        onChange={gameType => updateGameSettings({ gameType })}
        gameType={gameType}
      />
      {gameType === GAME_TYPES.TRAPDOOR.TECHNICAL_NAME && (
        <TrapdoorOptions
          updateGameSettings={updateGameSettings}
          trapdoorsAmount={trapdoorsAmount}
        />
      )}
      <DashboardButton
        displayText={submitText}
        onClick={handleOnSubmit}
        fullLength
        type="warning"
      />
    </div>
  );
};

CreateGame.defaultProps = {
  useCompact: true,
  noHeader: false,
  submitText: "Submit"
};

CreateGame.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  useCompact: PropTypes.bool,
  noHeader: PropTypes.bool,
  submitText: PropTypes.string
};

export default CreateGame;
