import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "components/dashboard-button/DashboardButton.module.scss";

const DashboardButton = ({
  children,
  onClick,
  type,
  fullLength,
  selected,
  spaceLeft,
  spaceRight,
  spaceBottom,
  spaceTop,
  useHtml,
  notAvailable,
  faded,
  className
}) => {
  const rootClassName = cx({
    [className]: className,
    [styles.root]: true,
    [styles.default]: type === "default",
    [styles.error]: type === "error",
    [styles.warning]: type === "warning",
    [styles.accept]: type === "accept",
    [styles.primary]: type === "primary",
    [styles.fullLength]: fullLength,
    [styles.selected]: selected,
    [styles.spaceLeft]: spaceLeft,
    [styles.spaceRight]: spaceRight,
    [styles.spaceBottom]: spaceBottom,
    [styles.spaceTop]: spaceTop,
    [styles.notAvailable]: notAvailable,
    [styles.faded]: faded
  });

  return (
    <div className={rootClassName} onClick={onClick}>
      {!useHtml ? (
        children
      ) : (
        <div dangerouslySetInnerHTML={{ __html: children }} />
      )}
    </div>
  );
};

DashboardButton.defaultProps = {
  type: "default"
};

DashboardButton.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(["default", "error", "warning", "accept", "primary"])
};

export default DashboardButton;
