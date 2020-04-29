import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import ConfirmModal from "components/confirm";

import styles from "./GameFooter.module.scss";

const GameFooter = ({resignGame}) => {

  return (
    <div className={styles.root}>
      <ConfirmModal
        title={"Are you sure you want to resign this game?"}
        onConfirm={resignGame}
      >
        <FontAwesomeIcon icon={faFlag} className={styles.icon} />
      </ConfirmModal>
    </div>
  );
};

export default GameFooter;
