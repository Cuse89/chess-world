import React from "react";
import DashboardButton from "components/dashboard-button";
import Swiper from "components/Swiper";
import { GAME_MODES, GAME_TYPES } from "utils/contants";
import DashboardOnline from "components/dashboard-online";

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

    return (
      <div>
        <Swiper options={gameTypes} handleNav={this.handleNav} />

        <div>
          <DashboardButton
            displayText={GAME_MODES.ONE_PLAYER.PRETTY}
            handleOnClick={() =>
              this.setupGame(GAME_MODES.ONE_PLAYER.TECHNICAL_NAME)
            }
          />
          <DashboardButton
            displayText={GAME_MODES.TWO_PLAYER.PRETTY}
            handleOnClick={() =>
              this.setupGame(GAME_MODES.TWO_PLAYER.TECHNICAL_NAME)
            }
          />
          <DashboardButton
            displayText={GAME_MODES.ONLINE_PLAY.PRETTY}
            handleOnClick={() =>
              this.props.setGameMode(GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME)
            }
          />
          {this.props.gameMode === GAME_MODES.ONLINE_PLAY.TECHNICAL_NAME && <DashboardOnline />}
        </div>
      </div>
    );
  }
}

export default Dashboard;
