import React from "react";
import usePushNotifications from "hooks/usePushNotifications";
import DashboardButton from "components/dashboard-button";
import styles from "./PushNotificationSetting.module.scss";

const PushNotificationSetting = ({ userId }) => {
  const {
    isSubscribed,
    subscribeToNotifications,
    unsubscribeToNotifications,
  } = usePushNotifications(userId);

  return (
    <div className={styles.root}>
      Allow push notifications:{" "}
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
