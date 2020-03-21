import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./DashboardButton.module.scss";

const DashboardButton = ({ displayText, onClick, type }) => {
  const className = cx({
    [styles.root]: true,
    [styles.default]: type === "default",
    [styles.error]: type === "error",
    [styles.warning]: type === "warning",
    [styles.accept]: type === "accept"
  });
  return (
    <div className={className} onClick={onClick}>
      {displayText}
    </div>
  );
};

DashboardButton.defaultProps = {
  type: "default"
};

DashboardButton.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(["default", "error", "warning", "accept"])
};

export default DashboardButton;
