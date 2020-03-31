import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "components/dashboard";
import StandardChess from "components/game-types/standard";
import TrapdoorChess from "components/game-types/trapdoor";
import TriviaChess from "components/game-types/trivia";
import Header from "components/header";
import useGameSettings from "hooks/useGameSettings";
import useUser from "hooks/useUser";
import Context from "context";

import "styles/styles.scss";
import styles from "./App.module.scss";

const App = () => {
  const gameSettings = useGameSettings();
  const user = useUser();
  return (
    <BrowserRouter>
      <Context.Provider value={{ gameSettings, user }}>
        <div className={styles.root}>
          <Header />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/standard" component={StandardChess} />
            <Route path="/trapdoor" component={TrapdoorChess} />
            <Route path="/trivia" component={TriviaChess} />
          </Switch>
        </div>
      </Context.Provider>
    </BrowserRouter>
  );
};

export default App;
