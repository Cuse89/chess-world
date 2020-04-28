import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import { faCog, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import Context from "context";
import firebase from "../../firebase";
import DashboardButton from "components/dashboard-button";
import Modal from "components/modal";
import UserProfile from "components/user-profile";
import Instructions from "components/instructions";
import { defaultGameSettings } from "hooks/useGameSettings";

import styles from "./Header.module.scss";

const Header = () => {
  const { gameSettings, updateGameSettings, user } = useContext(Context);
  const { gameType } = gameSettings;
  const [showUserSettings, setShowUserSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const onHomeClick = () => {
    updateGameSettings(defaultGameSettings);
  };
  const login = async () => {
    await firebase.login();
  };

  return (
    <header className={styles.root}>
      <NavLink to="/" onClick={onHomeClick}>
        <h3>Chess World</h3>
      </NavLink>

      <div className={styles.icons}>
        {gameType && (
          <FontAwesomeIcon
            icon={faQuestion}
            className={styles.icon}
            onClick={() => setShowHelp(true)}
          />
        )}
        {user && (
          <FontAwesomeIcon
            icon={faCog}
            onClick={() => setShowUserSettings(true)}
            className={styles.icon}
          />
        )}
        {!user && (
          <DashboardButton
            onClick={login}
            fullLength
            type="inverse"
            className={styles.login}
          >
            Login
          </DashboardButton>
        )}
      </div>

      {user && (
        <Modal
          open={showUserSettings}
          onClose={() => setShowUserSettings(false)}
        >
          <UserProfile />
        </Modal>
      )}

      <Modal onClose={() => setShowHelp(false)} open={showHelp}>
        <Instructions />
      </Modal>
    </header>
  );
};

export default Header;
