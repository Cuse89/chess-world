import React from "react";
import styles from "./DashboardButton.module.scss";

export const DashboardButton = props => (
  <div
    className={styles.dashboardButton}
    id={props.id}
    onClick={props.handleOnClick}
  >
    {props.displayText}
  </div>
);
