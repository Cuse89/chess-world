import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "components/modal";
import DashboardButton from "components/dashboard-button";

import styles from "./Confirm.module.scss";

const ConfirmModal = ({
  children,
  onConfirm,
  title,
  content,
  open,
  acceptText,
  cancelText
}) => {
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

  useEffect(() => {
    if (open) {
      setShowConfirm(true);
    }
  }, [open]);

  return (
    <Fragment>
      <Modal open={showConfirm} onClose={handleCancel} showCloseIcon={false}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {content}
        <div className={styles.buttons}>
          <DashboardButton onClick={handleCancel} type={"error"} fullLength>
            {cancelText}
          </DashboardButton>
          <DashboardButton
            onClick={handleConfirm}
            spaceLeft
            type={"primary"}
            fullLength
          >
            {acceptText}
          </DashboardButton>
        </div>
      </Modal>
      <div onClick={show}>{children}</div>
    </Fragment>
  );
};

ConfirmModal.defaultProps = {
  title: "",
  open: false,
  content: null,
  acceptText: "Yes",
  cancelText: "No"
};

ConfirmModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.node,
  open: PropTypes.bool,
  acceptText: PropTypes.string,
  cancelText: PropTypes.string
};

export default ConfirmModal;
