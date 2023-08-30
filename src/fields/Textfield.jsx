/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";
import React, { useState } from "react";

const Textfield = (props) => {
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
    handleOnChange(
      value,
      FIELD_NAME,
      PARENT_FIELD_NAME,
      keyRef
    );

    if (REQUIRED && value === "") {
      setError(true, FIELD_NAME);
      setHelperText(`${FIELD_NAME} is required.`);
    } else {
      setError(false, FIELD_NAME);
      setHelperText("");
    }
  }

  return (
    <TextField
      id={FIELD_ID}
      label={FIELD_LABEL}
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

export default React.memo(Textfield);
