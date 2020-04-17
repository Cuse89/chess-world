import React, { useContext, useState, Fragment } from "react";
import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Context from "context";
import firebase from "../../firebase";
import NameInput from "components/dashboard-online/name-input";
import UserAvailabilitySetting from "components/user-profile/user-availability-setting";
import PushNotificationSetting from "components/user-profile/push-notification-setting";
import DashboardButton from "components/dashboard-button";
import GameStats from "components/user-profile/game-stats";

import styles from "./UserProfile.module.scss";

const UserProfile = () => {
  const { user } = useContext(Context);
  const userId = user && user.id;
  const [editName, setEditName] = useState(false);

  const pen = onClick => (
    <FontAwesomeIcon
      className={styles.pen}
      icon={faPen}
      size={"sm"}
      onClick={onClick}
    />
  );

  if (userId) {
    return (
      <Fragment>
        <div className={styles.name}>
          Name:{" "}
          {!editName && (
            <Fragment>
              {user.name}
              {pen(() => setEditName(true))}{" "}
            </Fragment>
          )}
          {editName && (
            <NameInput user={user} onSubmit={() => setEditName(false)} />
          )}
        </div>
        <div className={styles.section}>
          <UserAvailabilitySetting userId={userId} />
        </div>
        <div className={styles.section}>
          <PushNotificationSetting userId={userId} />
        </div>
        <div className={styles.section}>
          <GameStats />
        </div>
        <div className={cx(styles.section, styles.logout)}>
          <DashboardButton onClick={firebase.logout} fullLength spaceTop>
            Logout
          </DashboardButton>
        </div>
      </Fragment>
    );
  }
  return null;
};

export default UserProfile;
