import React from "react";
import DashboardButton from "components/dashboard-button";
import styles from "./DragDropSetting.module.scss";

const DragDropSetting = ({ userId }) => {
  return (
    <div className={styles.root}>
      Use drag and drop
      <DashboardButton
        className={styles.button}
        onClick={() => null}
        type="accept"
        fullLength
        spaceLeft
        isLoading={false}
      >
        Yes
      </DashboardButton>
      <DashboardButton
        className={styles.button}
        onClick={() => null}
        type="error"
        fullLength
        spaceLeft
        isLoading={false}
      >
        No
      </DashboardButton>
    </div>
  );
};

export default DragDropSetting;
