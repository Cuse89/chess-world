import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "components/dashboard-button/DashboardButton.module.scss";

const DashboardButton = ({
  displayText,
  onClick,
  type,
  fullLength,
  selected,
  spaceRight,
  spaceBottom,
  spaceTop,
  useHtml,
  notAvailable
}) => {
  const className = cx({
    [styles.root]: true,
    [styles.default]: type === "default",
    [styles.error]: type === "error",
    [styles.warning]: type === "warning",
    [styles.accept]: type === "accept",
    [styles.fullLength]: fullLength,
    [styles.selected]: selected,
    [styles.spaceRight]: spaceRight,
    [styles.spaceBottom]: spaceBottom,
    [styles.spaceTop]: spaceTop,
    [styles.notAvailable]: notAvailable
  });

  return (
    <div className={className} onClick={onClick}>
      {!useHtml ? (
        displayText
      ) : (
        <div dangerouslySetInnerHTML={{ __html: displayText }} />
      )}
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
