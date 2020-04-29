import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "components/dashboard-button/DashboardButton.module.scss";
import Loader from "components/loader";

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
  disabled,
  faded,
  className,
  isLoading
}) => {
  const rootClassName = cx({
    [className]: className,
    [styles.root]: true,
    [styles.error]: type === "error",
    [styles.warning]: type === "warning",
    [styles.accept]: type === "accept",
    [styles.primary]: type === "primary",
    [styles.inverse]: type === "inverse",
    [styles.fullLength]: fullLength,
    [styles.selected]: selected,
    [styles.spaceLeft]: spaceLeft,
    [styles.spaceRight]: spaceRight,
    [styles.spaceBottom]: spaceBottom,
    [styles.spaceTop]: spaceTop,
    [styles.disabled]: disabled || isLoading,
    [styles.faded]: faded
  });

  return (
    <Loader size="small" isContained show={isLoading}>
      <div className={rootClassName} onClick={onClick}>
        {!useHtml ? (
          children
        ) : (
          <div dangerouslySetInnerHTML={{ __html: children }} />
        )}
      </div>{" "}
    </Loader>
  );
};

DashboardButton.defaultProps = {
  isLoading: false
};

DashboardButton.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf([
    "error",
    "warning",
    "accept",
    "primary",
    "inverse"
  ]),
  isLoading: PropTypes.bool
};

export default DashboardButton;
