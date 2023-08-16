/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import { TextField } from "@mui/material";

const PasswordField = ({
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
  dispatchFormData,
}) => {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleChange = (event) => {
    const value = event.target.value;
    handleOnChange(value, FIELD_NAME);

    if (REQUIRED && value === "") {
      setError(true);
      setHelperText("Password is required.");
    } else if (!validatePassword(value)) {
      setError(true);
      setHelperText("Password must be at least 8 characters.");
    } else {
      setError(false);
      setHelperText("");
    }
  };

  return (
    <TextField
      id={FIELD_ID}
      label={FIELD_LABEL}
      type="password"
      value={VALUE}
      onChange={handleChange}
      error={error}
      helperText={helperText}
      variant="outlined"
      required={REQUIRED}
      disabled={DISABLED}
      fullWidth
      autoComplete="current-password"
    />
  );
};

export default React.memo(PasswordField);