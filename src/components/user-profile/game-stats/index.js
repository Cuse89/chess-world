import React, { useContext } from "react";
import Context from "context";

import styles from "./GameStats.module.scss"

const GameStats = () => {
  const { user } = useContext(Context);
  const { gameStats } = user;
  const won = (gameStats && gameStats.won) || 0;
  const lost = (gameStats && gameStats.lost) || 0;
  const played = (gameStats && gameStats.played) || 0;
  return (
    <div className={styles.root}>
      <h4>Game Statistics:</h4>
      <p>Games played: {played}</p>
      <p>Games won: {won}</p>
      <p>Games lost: {lost}</p>
    </div>
  );
};

export default GameStats;
