import React from "react";
import cx from "classnames";
import InputForm from "components/input-form";
import firebase from "../../../firebase";
import styles from "./NameInput.module.scss";
import useAvailableUsers from "hooks/useAvailableUsers";

const NameInput = ({ user }) => {
  const { updateAvailableUser, getUserAvailability } = useAvailableUsers();

  const submitName = async name => {
    console.log({ name, user });
    try {
      await firebase.setUser(user.id, "name", name);
      await updateAvailableUser(user.id, true);
    } catch (err) {
      console.log(err);
    }
  };

  const userAvailable = getUserAvailability(user.id);

  const toggleAvailability = async () => {
    try {
      await updateAvailableUser(user.id, userAvailable ? null : true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.root}>
      {user.name && (
        <p className={styles.message}>
          Hello {user.name}! -{" "}
          <span
            className={cx({
              [styles.available]: userAvailable,
              [styles.unavailable]: !userAvailable
            })}
            onClick={toggleAvailability}
          >
            {userAvailable ? "Available" : "Unavailable"}
          </span>
        </p>
      )}
      {!user.name && (
        <InputForm
          inputType="text"
          placeholder="Enter your nickname"
          submitText="Ok"
          submit={submitName}
          validateInput={input => input.length > 0}
        />
      )}
    </div>
  );
};

export default NameInput;
