import React from "react";
import styles from "./DashboardButton.module.scss";

const DashboardButton = ({ id, handleOnClick, displayText }) => (
  <div className={styles.dashboardButton} id={id} onClick={handleOnClick}>
    {displayText}
  </div>
);

export default DashboardButton;
