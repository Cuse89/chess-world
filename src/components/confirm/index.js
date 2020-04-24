import React, { useState, Fragment } from "react";
import Modal from "components/modal";
import DashboardButton from "components/dashboard-button";

import styles from "./Confirm.module.scss";

const Confirm = ({ children, onConfirm, title }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const show = () => {
    setShowConfirm(true);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const handleConfirm = () => {
    onConfirm();
    setShowConfirm(false);
  };

  return (
    <Fragment>
      <Modal open={showConfirm} onClose={handleCancel} showCloseIcon={false}>
        {title}
        <div className={styles.buttons}>
          <DashboardButton onClick={handleCancel} type={"error"}>Cancel</DashboardButton>
          <DashboardButton onClick={handleConfirm} spaceLeft type={"primary"}>Yes</DashboardButton>
        </div>
      </Modal>
      <div onClick={show}>{children}</div>
    </Fragment>
  );
};

export default Confirm;
