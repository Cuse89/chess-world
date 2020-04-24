import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-regular-svg-icons";

import styles from "./GameFooter.module.scss"

const GameFooter = () => {

  return (
    <div className={styles.root}>
      <FontAwesomeIcon icon={faFlag} className={styles.icon}/>

    </div>
  )
};

export default GameFooter;