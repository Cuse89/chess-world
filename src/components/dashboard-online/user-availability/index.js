import React from "react";
import cx from "classnames";
import styles from "./UserAvailability.module.scss";

const UserAvailability = ({ user, userAvailable, updateAvailableUser }) => {
  const toggleAvailability = async () => {
    try {
      await updateAvailableUser(user.id, userAvailable ? null : true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default UserAvailability;
