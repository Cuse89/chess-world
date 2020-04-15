import React, { useContext, useState } from "react";
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
        <DashboardButton
          onClick={() => setShowUserSettings(true)}
          fullLength
          type="inverse"
        >
          User settings
        </DashboardButton>
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
