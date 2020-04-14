import React from "react";
import usePushNotifications from "hooks/usePushNotifications";

import styles from "./PushNotificationSetting.module.scss";
import DashboardButton from "components/dashboard-button";

const PushNotificationSetting = ({ userId }) => {
  const {
    isSubscribed,
    subscribeToNotifications,
    unsubscribeToNotifications,
    message
  } = usePushNotifications(userId);

  return (
    <div className={styles.root}>
      Allow Push Notifications:{" "}
      {isSubscribed && (
        <DashboardButton
          onClick={unsubscribeToNotifications}
          type="accept"
          fullLength
          spaceLeft
        >
          Yes
        </DashboardButton>
      )}
      {!isSubscribed && (
        <DashboardButton
          onClick={subscribeToNotifications}
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

export default PushNotificationSetting;
