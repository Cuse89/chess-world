import React, { Component } from "react";

import Dashboard from "../dashboard";
import styles from "./App.module.scss";
import "../../styles/styles.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameMode: "",
      gameType: "",
      showDashboard: true,
      showGame: false
    };
  }

  toggleDashboard = show => this.setState({ showDashboard: show });
  setGameType = gameType => this.setState({ gameType });
  setGameMode = gameMode => this.setState({ gameMode });

  render() {
    const { showDashboard } = this.state;
    return (
      <div className={styles.root}>
        <header>
          <h3 onClick={() => this.toggleDashboard(true)}>Chess World</h3>
        </header>
        {showDashboard && (
          <Dashboard
            setGameType={this.setGameType}
            setGameMode={this.setGameMode}
            toggleDashboard={this.toggleDashboard}
          />
        )}
      </div>
    );
  }
}

export default App;
