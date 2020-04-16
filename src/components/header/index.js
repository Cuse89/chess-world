import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import Context from "context";
import firebase from "../../firebase";
import DashboardButton from "components/dashboard-button";
import styles from "./Header.module.scss";
import Modal from "components/modal";
import UserProfile from "components/user-profile";

const Header = () => {
  const { gameSettings } = useContext(Context);
  const { user } = useContext(Context);
  const { updateGameSettings } = gameSettings;
  const [showUserSettings, setShowUserSettings] = useState(false);
  const onHeaderClick = () => {
    updateGameSettings({ gameMode: "", gameType: "" });
  };
  const login = async () => {
    await firebase.login();
  };

  return (
    <header onClick={onHeaderClick} className={styles.root}>
      <NavLink to="/">
        <h3>Chess World</h3>
      </NavLink>
      {!user && (
        <DashboardButton onClick={login} fullLength type="inverse">
          Login
        </DashboardButton>
      )}
      {user && (
        <FontAwesomeIcon
          icon={faCog}
          onClick={() => setShowUserSettings(true)}
          className={styles.cog}
        />
      )}
      {user && (
        <Modal
          open={showUserSettings}
          onClose={() => setShowUserSettings(false)}
        >
          <UserProfile />
        </Modal>
      )}
    </header>
  );
};

export default Header;
