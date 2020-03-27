import React, { useContext, useState } from "react";

import SelectGameMode from "components/select-game-mode";
import CreateGame from "components/create-game";
import { GAME_MODES } from "utils/constants";
import Context from "context";
import DashboardOnline from "components/dashboard-online";

import styles from "./Dashboard.module.scss";

const Dashboard = ({ history }) => {
  const { settings } = useContext(Context);
  const { setGameMode, gameType, setGameType } = settings;
  const [section, setSection] = useState("selectGameMode");

  console.log("Dashboard", { gameType });
  const onGameModeClick = gameMode => {
    setGameMode(gameMode);
    if (gameMode === GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME) {
      setSection("online");
    } else {
      setSection("createGame");
    }
  };

  const handleOnSubmit = settings => {
    const { gameType } = settings;
    setGameType(gameType);
    // set other settings passed through from CreateGame
    history.push(`/${gameType}`);
  };

  return (
    <div className={styles.root}>
      {section === "selectGameMode" && (
        <SelectGameMode history={history} onGameModeClick={onGameModeClick} />
      )}
      {section === "online" && <DashboardOnline history={history} />}
      {section === "createGame" && (
        <CreateGame onSubmit={handleOnSubmit} />
      )}
    </div>
  );
};

export default Dashboard;
