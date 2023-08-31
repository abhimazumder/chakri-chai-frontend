/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { TextField } from "@mui/material";
import React, { useState } from "react";

const Number = (props) => {
  const {
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
    OPTIONS,
    ERROR,
    VALUE,
    keyRef,
    handleOnChange,
    setError,
    dispatchFormData,
  } = props;

  const [helperText, setHelperText] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    handleOnChange(value, FIELD_NAME, PARENT_FIELD_NAME, keyRef);

    if (REQUIRED && value === "") {
      setError(true, FIELD_NAME, PARENT_FIELD_NAME, keyRef);
      setHelperText(`${FIELD_NAME} is required.`);
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
      onChange={handleChange}
      error={ERROR}
      helperText={helperText}
      variant="outlined"
      type="number"
      required={REQUIRED}
      disabled={DISABLED}
      fullWidth
    />
  );
};

export default React.memo(Number);
