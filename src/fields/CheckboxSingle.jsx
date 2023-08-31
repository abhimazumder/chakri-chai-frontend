/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Checkbox, InputLabel } from "@mui/material";
import React, { useState } from "react";

const CheckboxSingle = ({
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
  SUB_FIELDS,
  VALUE,
  keyRef,
  handleOnChange,
  setError,
  dispatchFormData,
}) => {
  const [helperText, setHelperText] = useState("");

  const handleChange = (event) => {
    const value = event.target.checked;
    handleOnChange(value, FIELD_NAME, PARENT_FIELD_NAME, keyRef);
    dispatchFormData({
      type: "TOGGLE_DISABLE_END_DATE",
      payload: {
        childKeyName: keyRef,
        checked: value,
      },
    });
    if (REQUIRED && value === "") {
      setError(true, FIELD_NAME, PARENT_FIELD_NAME, keyRef);
      setHelperText(`${FIELD_NAME} is required.`);
    } else {
      setError(false, FIELD_NAME, PARENT_FIELD_NAME, keyRef);
      setHelperText("");
    }
  };

  return (
    <>
      <InputLabel>{FIELD_LABEL}</InputLabel>
      <Checkbox
        id={FIELD_ID}
        label={FIELD_LABEL}
        checked={VALUE}
        onChange={handleChange}
        variant="outlined"
        required={REQUIRED}
        disabled={DISABLED}
      />
    </>
  );
};

export default React.memo(CheckboxSingle);
