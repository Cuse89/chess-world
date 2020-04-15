import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Context from "context";
import Dashboard from "components/dashboard";
import StandardChess from "components/game-types/standard";
import TrapdoorChess from "components/game-types/trapdoor";
import TriviaChess from "components/game-types/trivia";
import Header from "components/header";
import useGameSettings from "hooks/useGameSettings";
import useUser from "hooks/useUser";
import Footer from "components/footer";
import styles from "./App.module.scss";
import Loader from "components/loader";


const App = () => {
  const gameSettings = useGameSettings();
  const { user, fetchingUser } = useUser();
  return (
    <BrowserRouter>
      <Context.Provider value={{ gameSettings, user, fetchingUser }}>
        <div className={styles.root}>
          <Loader show={fetchingUser} size="large">
            <Header />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/standard" component={StandardChess} />
              <Route path="/trapdoor" component={TrapdoorChess} />
              <Route path="/trivia" component={TriviaChess} />
            </Switch>
            <Footer />
          </Loader>
        </div>
      </Context.Provider>
    </BrowserRouter>
  );
};

export default App;
