/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { TextField } from "@mui/material";

const EmailField = ({
  SIZE,
  FIELD_TYPE,
  FIELD_LABEL,
  FIELD_ID,
  FIELD_NAME,
  EXPANDABLE,
  REQUIRED,
  DISABLED,
  PARENT_FIELD_NAME,
  PARENT_FIELD_ID,
  ERROR,
  VALUE,
  keyRef,
  handleOnChange,
  setError,
  dispatchFormData,
}) => {
  const [helperText, setHelperText] = useState("");

  const validateEmail = (email) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return isValid;
  };

  const handleChange = (event) => {
    const value = event.target.value;
    handleOnChange(value, FIELD_NAME, PARENT_FIELD_NAME, keyRef);

    if (REQUIRED && value === "") {
      setError(true, FIELD_NAME, PARENT_FIELD_NAME, keyRef);
      setHelperText(`${FIELD_NAME} is required.`);
    } else if (!validateEmail(value)) {
      setError(true, FIELD_NAME, PARENT_FIELD_NAME, keyRef);
      setHelperText("Invalid email format.");
    } else {
      setError(false, FIELD_NAME, PARENT_FIELD_NAME, keyRef);
      setHelperText("");
    }
  };

  return (
    <TextField
      id={FIELD_ID}
      label={FIELD_LABEL}
      type="email"
      value={VALUE}
      onChange={handleChange}
      error={ERROR}
      helperText={helperText}
      variant="outlined"
      required={REQUIRED}
      disabled={DISABLED}
      fullWidth
    />
  );
};

export default React.memo(EmailField);
