import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Context from "context";
import Dashboard from "components/dashboard";
import StandardChess from "components/game-types/standard";
import TrapdoorChess from "components/game-types/trapdoor";
import TriviaChess from "components/game-types/trivia";
import RoyalBlood from "components/game-types/royal-blood";
import Header from "components/header";
import useGameSettings from "hooks/useGameSettings";
import useUser from "hooks/useUser";
import Loader from "components/loader";
import styles from "./App.module.scss";

const App = () => {
  const { gameSettings, setGameId, updateGameSettings } = useGameSettings();
  const { user, isFetching, userOnline } = useUser();
  return (
    <BrowserRouter>
      <Context.Provider
        value={{
          gameSettings,
          setGameId,
          updateGameSettings,
          user,
          userOnline
        }}
      >
        <div className={styles.root}>
          <Loader show={isFetching} size="large" delay={0}>
            <Header />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/standard" component={StandardChess} />
              <Route path="/trapdoor" component={TrapdoorChess} />
              <Route path="/trivia" component={TriviaChess} />
              <Route path="/royalBlood" component={RoyalBlood} />
            </Switch>
          </Loader>
        </div>
      </Context.Provider>
    </BrowserRouter>
  );
};

export default App;
