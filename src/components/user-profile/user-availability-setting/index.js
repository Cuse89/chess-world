import React from "react";

import useAvailableUsers from "hooks/useAvailableUsers";
import DashboardButton from "components/dashboard-button";
import styles from "./UserAvailability.module.scss";

const UserAvailabilitySetting = ({ userId }) => {
  const { userAvailable, updateAvailableUser } = useAvailableUsers(userId);

  return (
    <div className={styles.root}>
      Available for online games:
      {userAvailable && (
        <DashboardButton
          className={styles.button}
          onClick={() => updateAvailableUser(userId, null)}
          type="accept"
          fullLength
          spaceLeft
        >
          Yes
        </DashboardButton>
      )}
      {!userAvailable && (
        <DashboardButton
          className={styles.button}
          onClick={() => updateAvailableUser(userId, true)}
          type="error"
          fullLength
          spaceLeft
        >
          No
        </DashboardButton>
      )}
    </div>
  );
};

export default UserAvailabilitySetting;
