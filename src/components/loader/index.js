import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Loader.module.scss";

const Loader = ({ size, color }) => {
  const className = cx([styles.root], [styles[size]], [styles[color]]);
  return (
    <div>
      <img className={className} src="./tail-spin.svg" />
    </div>
  );
};

Loader.defaultProps = {
  size: "medium",
  color: "darkBlue"
};

Loader.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf(["blue"])
};

export default Loader;
