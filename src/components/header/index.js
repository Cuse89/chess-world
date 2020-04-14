import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import Context from "context";

const Header = () => {
  const { gameSettings } = useContext(Context);
  const { updateGameSettings } = gameSettings;
  const onHeaderClick = () => {
    updateGameSettings({ gameMode: "", gameType: "" });
  };
  return (
    <header className={styles.root}>
      <NavLink to="/">
        <h3 onClick={onHeaderClick}>Chess World</h3>
      </NavLink>
    </header>
  );
};

export default Header;
