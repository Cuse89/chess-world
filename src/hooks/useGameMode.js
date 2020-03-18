import React, { useState } from "react";
import { GAME_MODES } from "utils/contants";

const useGameMode = () => {
  const [gameMode, setGameMode] = useState(GAME_MODES.ONE_PLAYER.TECHNICAL_NAME);
  return {gameMode, setGameMode};
};
export default useGameMode;
