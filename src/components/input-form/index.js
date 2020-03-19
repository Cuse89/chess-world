import React, { useState } from "react";

import styles from "./InputForm.module.scss";

const InputForm = ({
  inputType,
  placeholder,
  autoComplete,
  submit,
  submitText,
  validateInput,
}) => {
  const [inputValue, setInputValue] = useState("");
  const onChange = e => setInputValue(e.target.value);
  const onSubmit = e => {
    e.preventDefault();
    submit(inputValue);
    setInputValue("");
  };
  return (
    <form className={styles.root} onSubmit={onSubmit}>
      <input
        type={inputType}
        onChange={onChange}
        placeholder={placeholder}
        value={inputValue}
        autoComplete={autoComplete}
      />
      <input
        className={styles.submit}
        type="submit"
        value={submitText}
        disabled={!validateInput(inputValue)}
      />
    </form>
  );
};

export default InputForm;
