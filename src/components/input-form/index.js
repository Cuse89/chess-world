import React, { useState } from "react";

const InputForm = ({
  id,
  inputType,
  placeholder,
  autoComplete,
  submit,
  submitText,
  validateInput,
  label
}) => {
  const [inputValue, setInputValue] = useState("");
  const onChange = e => setInputValue(e.target.value);
  const onSubmit = e => {
    e.preventDefault();
    submit(inputValue);
    setInputValue("");
  };
  return (
    <form
      className="form-wrapper"
      id={`${id}-form-wrapper`}
      onSubmit={onSubmit}
    >
      {label && <label className="form-label">{label}</label>}
      <div className="form-inputs" id={`${id}-form-inputs`}>
        <input
          className="input-text"
          id={`${id}-input-text`}
          type={inputType}
          onChange={onChange}
          placeholder={placeholder}
          value={inputValue}
          autoComplete={autoComplete}
        />

        <input
          className="input-submit pointer"
          id={`${id}-input-submit`}
          type="submit"
          value={submitText}
          disabled={!validateInput(inputValue)}
        />
      </div>
    </form>
  );
};

export default InputForm;
