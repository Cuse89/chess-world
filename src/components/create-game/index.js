import React from "react";
import PropTypes from "prop-types";
import SelectGameType from "components/select-game-type";
import DashboardButton from "components/dashboard-button";

import styles from "./CreateGame.module.scss";
import useGameSettings from "hooks/useGameSettings";

const CreateGame = ({ onSubmit, useCompact, noHeader, submitText }) => {
  const { gameType, setGameType } = useGameSettings();
  const handleOnSubmit = () => {
    onSubmit({ gameType });
  };
  return (
    <div className={styles.root}>
      {!noHeader && <h3>Create your game</h3>}
      <SelectGameType onChange={setGameType} useSwiper={!useCompact} />
      <DashboardButton displayText={submitText} onClick={handleOnSubmit} fullLength type="warning"/>
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
