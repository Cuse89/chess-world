import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Loader.module.scss";

const Loader = ({ show, size, color, isContained, delay, children }) => {
  const [isDelaying, setIsDelaying] = useState(delay);
  const imgClassName = cx([styles.image], [styles[size]], [styles[color]]);
  const spinner = (
    <div className={cx({ [styles.contained]: isContained })}>
      <img className={imgClassName} src="./tail-spin.svg" />
    </div>
  );

  useEffect(() => {
    if (show && delay) {
      setTimeout(() => {
        setIsDelaying(false);
      }, delay);
    }
  }, [delay, show]);

  if (show && !isDelaying) {
    console.log("return spinner")
    return spinner;
  }
  console.log("return children")
  return children;
};

Loader.defaultProps = {
  size: "medium",
  color: "darkBlue",
  isContained: false
};

Loader.propTypes = {
  show: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf(["blue", "darkBlue"]),
  isContained: PropTypes.bool,
  delay: PropTypes.number
};

export default Loader;
