import React, { useContext, useState } from "react";

import SelectGameMode from "components/select-game-mode";
import CreateGame from "components/create-game";
import { GAME_MODES } from "utils/constants";
import Context from "context";
import DashboardOnline from "components/dashboard-online";

import styles from "./Dashboard.module.scss";

const Dashboard = ({ history }) => {
  const { gameSettings } = useContext(Context);
  const { updateGameSettings } = gameSettings;
  const [section, setSection] = useState("selectGameMode");

  const onGameModeClick = gameMode => {
    updateGameSettings({ gameMode });
    if (gameMode === GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME) {
      setSection("online");
    } else {
      setSection("createGame");
    }
  };

  const onCreateGameSubmit = settings => {
    updateGameSettings(settings);
    history.push(`/chess-world/${settings.gameType}`);
  };

  return (
    <div className={styles.root}>
      {section === "selectGameMode" && (
        <SelectGameMode history={history} onGameModeClick={onGameModeClick} />
      )}
      {section === "online" && <DashboardOnline history={history} />}
      {section === "createGame" && <CreateGame onSubmit={onCreateGameSubmit} />}
    </div>
  );
};

export default Dashboard;
