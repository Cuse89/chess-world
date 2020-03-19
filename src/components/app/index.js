import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "components/dashboard";
import Standard from "components/game-types/standard";
import Header from "components/header";
import useGameMode from "hooks/useGameMode";
import DashboardOnline from "components/dashboard-online";

import "styles/styles.scss";
import styles from "./App.module.scss";

export const Context = React.createContext(null);

const App = () => {
  const { gameMode } = useGameMode();
  // const user = useUser();
  return (
    <BrowserRouter>
      <Context.Provider value={{ gameMode }}>
        <div className={styles.root}>
          <Header />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/standard" component={Standard} />
          </Switch>
        </div>
      </Context.Provider>
    </BrowserRouter>
  );
};

export default App;
