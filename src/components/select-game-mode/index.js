import React from "react";
import DashboardButton from "components/dashboard-button";
import { GAME_MODES } from "utils/constants";

const SelectGameMode = ({ onGameModeClick }) => (
  <div>
    <DashboardButton
      displayText={GAME_MODES.ONE_PLAYER.PRETTY}
      onClick={() => onGameModeClick(GAME_MODES.ONE_PLAYER.TECHNICAL_NAME)}
    />
    <DashboardButton
      displayText={GAME_MODES.TWO_PLAYER.PRETTY}
      onClick={() => onGameModeClick(GAME_MODES.TWO_PLAYER.TECHNICAL_NAME)}
    />
    <DashboardButton
      displayText={GAME_MODES.ONLINE_PLAY.PRETTY}
      onClick={() => onGameModeClick(GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME)}
    />
  </div>
);

export default SelectGameMode;
