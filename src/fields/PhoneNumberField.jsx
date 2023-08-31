/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { TextField } from "@mui/material";
import React, { useState } from "react";

const PhoneNumber = ({
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

  const handleChange = (event) => {
    const value = event.target.value;
    handleOnChange(value, FIELD_NAME, PARENT_FIELD_NAME, keyRef);

    if (REQUIRED && value === "") {
      setError(true, FIELD_NAME, PARENT_FIELD_NAME, keyRef);
      setHelperText(`${FIELD_NAME} is required.`);
    } else if (value.replace(/\D/g, "").length !== 10) {
      setError(true, FIELD_NAME, PARENT_FIELD_NAME, keyRef);
      setHelperText(`${FIELD_NAME} should be of 10 digits.`);
    } else {
      setError(false, FIELD_NAME, PARENT_FIELD_NAME, keyRef);
      setHelperText("");
    }
  };

  return (
    <TextField
      id={FIELD_ID}
      label={FIELD_LABEL}
      value={VALUE}
      type="number"
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

export default React.memo(PhoneNumber);
