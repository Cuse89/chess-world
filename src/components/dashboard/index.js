import React from "react";
import { GAME_MODES, GAME_TYPES } from "utils/contants";

import { DashboardButton } from "../dashboard-button/index.js";


import Swiper from "../Swiper";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  setupGame = gameMode => {
    this.props.setGameMode(gameMode);
    this.props.toggleDashboard(false);
    this.props.toggleGame(true);
  };

  handleNav = gameType => {
    this.props.setGameType(gameType);
  };

  render() {
    // val = redux store key. (needs at least 4 for some reason else ReactSwipe breaks)
    let gameTypes = [
      { val: "standard", pretty: "Standard Chess" },
      { val: "trapdoor", pretty: "Trapdoor Chess" },
      { val: "trivia", pretty: "Trivia Chess" },
      { val: "standard", pretty: "Standard Chess" },
      { val: "trapdoor", pretty: "Trapdoor Chess" },
      { val: "trivia", pretty: "Trivia Chess" }
    ];

    return (
      <div>
        <Swiper options={gameTypes} handleNav={this.handleNav} />

        <div>
          <DashboardButton
            displayText={"One Player"}
            handleOnClick={() => this.setupGame(GAME_MODES.ONE_PLAYER.TECHNICAL_NAME)}
          />
          <DashboardButton
            displayText={"Two Player"}
            handleOnClick={() => this.setupGame(GAME_MODES.TWO_PLAYER.TECHNICAL_NAME)}
          />
          <DashboardButton
            displayText={"Online Play"}
            classNames={this.props.gameMode === "onlinePlay" ? " selected" : ""}
            handleOnClick={() => this.props.setGameMode(GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME)}
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;
