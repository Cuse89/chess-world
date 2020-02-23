import React from "react";

import { DashboardButton } from "../dashboard-button/index.js";
import { GAME_TYPES } from "../../utils/contants";

import Swiper from "../Swiper";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  setupGame = gameMode => {
    this.props.setGameMode(gameMode);
    this.props.toggleDashboard(false);
  };

  hideDashboard = () => {
    this.props.toggleDashboard(false);
  };

  handleNav = gameType => {
    this.props.setGameMode(gameType);
  };

  render() {
    // val = redux store key. (needs at least 4 for some reason else ReactSwipe breaks)
    let games = [
      { val: "standard", pretty: "Standard Chess" },
      { val: "trapdoor", pretty: "Trapdoor Chess" },
      { val: "trivia", pretty: "Trivia Chess" },
      { val: "standard", pretty: "Standard Chess" },
      { val: "trapdoor", pretty: "Trapdoor Chess" },
      { val: "trivia", pretty: "Trivia Chess" }
    ];

    return (
      <div>
        <Swiper options={games} handleNav={this.handleNav} />

        <div className="flex">
          <DashboardButton
            displayText={"One Player"}
            handleOnClick={() => this.setupGame(GAME_TYPES.ONE_PLAYER)}
          />
          <DashboardButton
            displayText={"Two Player"}
            handleOnClick={() => this.setupGame(GAME_TYPES.TWO_PLAYER)}
          />
          <DashboardButton
            displayText={"Online Play"}
            classNames={this.props.gameType === "onlinePlay" ? " selected" : ""}
            handleOnClick={() => this.props.setGameType(GAME_TYPES.ONLINE_PLAY)}
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;
