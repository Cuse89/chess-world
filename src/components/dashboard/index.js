import React, { useState } from "react";
import DashboardButton from "components/dashboard-button";
import Swiper from "components/Swiper";
import { GAME_MODES, GAME_TYPES } from "utils/contants";
import DashboardOnline from "components/dashboard-online";
import useGameMode from "hooks/useGameMode";

const Dashboard = ({ history }) => {
  const { gameMode, setGameMode } = useGameMode();
  const [gameType, setGameType] = useState(GAME_TYPES.STANDARD.TECHNICAL_NAME);

  const standard = {
    val: GAME_TYPES.STANDARD.TECHNICAL_NAME,
    pretty: GAME_TYPES.STANDARD.PRETTY
  };
  const trapdoor = {
    val: GAME_TYPES.TRAPDOOR.TECHNICAL_NAME,
    pretty: GAME_TYPES.TRAPDOOR.PRETTY
  };
  const trivia = {
    val: GAME_TYPES.TRIVIA.TECHNICAL_NAME,
    pretty: GAME_TYPES.TRIVIA.PRETTY
  };
  // needs at least 4 for some reason else ReactSwipe breaks
  let gameTypes = [standard, trapdoor, trivia, standard, trapdoor, trivia];

  const startGame = gameMode => {
    setGameMode(gameMode);
    history.push(`/${gameType}`);
  };

  const onOnlinePlayClick = () => {
    setGameMode(GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME);
    history.push("/dashboard/online");
  };

  return (
    <div>
      <Swiper options={gameTypes} handleNav={setGameType} />

      <div>
        <DashboardButton
          displayText={GAME_MODES.ONE_PLAYER.PRETTY}
          onClick={() => startGame(GAME_MODES.ONE_PLAYER.TECHNICAL_NAME)}
        />
        <DashboardButton
          displayText={GAME_MODES.TWO_PLAYER.PRETTY}
          onClick={() => startGame(GAME_MODES.TWO_PLAYER.TECHNICAL_NAME)}
        />
        <DashboardButton
          displayText={GAME_MODES.ONLINE_PLAY.PRETTY}
          onClick={onOnlinePlayClick}
        />
        {gameMode === GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME && (
          <DashboardOnline />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
