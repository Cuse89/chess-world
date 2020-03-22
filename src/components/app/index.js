import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "components/dashboard";
import Standard from "components/game-types/standard";
import Header from "components/header";
import useGameSettings from "hooks/useGameSettings";
import DashboardOnline from "components/dashboard-online";
import useUser from "hooks/useUser";

import "styles/styles.scss";
import styles from "./App.module.scss";

export const Context = React.createContext(null);

const App = () => {
  const settings = useGameSettings();
  const user = useUser();
  return (
    <BrowserRouter>
      <Context.Provider value={{ settings, user }}>
        <div className={styles.root}>
          <Header />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dashboard/online" component={DashboardOnline} />
            <Route path="/standard" component={Standard} />
          </Switch>
        </div>
      </Context.Provider>
    </BrowserRouter>
  );
};

export default App;
