import React from "react";
import { Modal as RModal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import styles from "./Modal.module.scss"

const Modal = ({ open, onClose, children }) => (
  <RModal open={open} onClose={onClose}>
    <div className={styles.content}>
      {children}
    </div>

  </RModal>
);

export default Modal;
