import React from "react";
import PropTypes from "prop-types";
import { Modal as RModal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import styles from "./Modal.module.scss";

const Modal = ({ open, onClose, children, showCloseIcon }) => (
  <RModal open={open} onClose={onClose} showCloseIcon={showCloseIcon}>
    <div className={styles.content}>{children}</div>
  </RModal>
);

Modal.defaultProps = {
  showCloseIcon: true
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  showCloseIcon: PropTypes.bool
};

export default Modal;
