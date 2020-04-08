import React from "react";
import InputForm from "components/input-form";
import firebase from "../../../firebase";

const NameInput = ({ user, updateAvailableUser }) => {
  const submitName = async name => {
    await firebase.setUser(user.id, "name", name);
    await updateAvailableUser(user.id, true);
  };

  return (
    <div>
      <InputForm
        inputType="text"
        placeholder="Enter your nickname"
        submitText="Ok"
        submit={submitName}
        validateInput={input => input.length > 0}
      />
    </div>
  );
};

export default NameInput;
