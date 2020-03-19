import React, { useContext } from "react";
import InputForm from "components/input-form";
import firebase from "../../../firebase";
import styles from './NameInput.module.scss'

const NameInput = ({ user }) => {
  const submitName = async name => {
    try {
      await firebase.setUser(user.uid, "name", name);
    } catch (err) {
      console.log("Name was not set", err);
    }
  };
  return (
    <InputForm
      inputType="text"
      placeholder="Enter your nickname"
      submitText="Ok"
      submit={submitName}
      validateInput={input => input.length > 0}
      className={styles.enterName}
    />
  );
};

export default NameInput;
