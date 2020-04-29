import React from "react";
import cx from "classnames";

import styles from "./Banner.module.scss";

const Banner = ({ message, canClose, onClick, type }) => {
  const rootClassName = cx({
    [styles.root]: true,
    [styles.default]: type === "default",
    [styles.warning]: type === "warning"

  });

  return <div className={rootClassName}>{message}</div>;
};

export default Banner;
