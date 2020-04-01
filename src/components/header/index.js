import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => (
  <header className={styles.root}>
    <NavLink to="/chess-world/dashboard">
      <h3>Chess World</h3>
    </NavLink>

  </header>
);

export default Header;
