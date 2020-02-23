import React, { Component } from "react";

import Dashboard from "../dashboard";
import Standard from "../game-types/standard";

import "../../styles/styles.scss";
import styles from "./App.module.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameMode: "onePlayer",
      gameType: "standard",
      showDashboard: true,
      showGame: false
    };
  }

  toggleDashboard = show => this.setState({ showDashboard: show });
  toggleGame = show => this.setState({ showGame: show });
  setGameType = gameType => this.setState({ gameType });
  setGameMode = gameMode => this.setState({ gameMode });

  render() {
    const { showDashboard, showGame, gameType, gameMode } = this.state;
    return (
      <div className={styles.root}>
        <header className={styles.header}>
          <h3 onClick={() => this.toggleDashboard(true)}>Chess World</h3>
        </header>
        {showDashboard && (
          <Dashboard
            setGameType={this.setGameType}
            setGameMode={this.setGameMode}
            toggleDashboard={this.toggleDashboard}
            toggleGame={this.toggleGame}
          />
        )}
        {showGame && gameType === "standard" && (
          <Standard gameMode={gameMode} />
        )}
        {/*  game types below, each receives the gameMode (string) as a prop and all gameMode logic is in GameType comp*/}
      </div>
    );
  }
}

export default App;
