/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";

const DateField = ({
  SIZE,
  FIELD_TYPE,
  FIELD_LABEL,
  FIELD_ID,
  FIELD_NAME,
  DISABLE_PAST,
  DISABLE_FUTURE,
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
}) => {
  const [helperText, setHelperText] = useState("");

  useEffect(() => {
    if (ERROR) {
      setHelperText(`${FIELD_NAME} is required.`);
    } else {
      setHelperText("");
    }
  }, [ERROR]);

  const handleChange = (value) => {
    handleOnChange(value.toISOString(), FIELD_NAME, PARENT_FIELD_NAME, keyRef);

    if (REQUIRED && (value === "" || value === null)) {
      setError(true, FIELD_NAME, PARENT_FIELD_NAME, keyRef);
      setHelperText(`${FIELD_NAME} is required.`);
    } else {
      setError(false, FIELD_NAME, PARENT_FIELD_NAME, keyRef);
      setHelperText("");
    }
  };

  return (
    <DatePicker
      id={FIELD_ID}
      label={FIELD_LABEL}
      value={VALUE ? new Date(VALUE) : null}
      onChange={handleChange}
      slotProps={{
        textField: {
          error: ERROR,
          helperText: helperText,
        },
      }}
      format="dd-MM-yyyy"
      disablePast={DISABLE_PAST}
      disableFuture={DISABLE_FUTURE}
      required={REQUIRED}
      disabled={DISABLED}
      sx={{
        width: "100%",
      }}
    />
  );
};

export default React.memo(DateField);
