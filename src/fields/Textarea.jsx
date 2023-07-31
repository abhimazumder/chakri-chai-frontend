/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { TextField } from "@mui/material";
import React from "react";

const Textarea = (props) => {
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
    dispatchFormData,
  } = props;
  return (
    <TextField
      id={FIELD_ID}
      label={FIELD_LABEL}
      value={VALUE}
      onChange={(event) =>
        handleOnChange(
          event.target.value,
          FIELD_NAME,
          PARENT_FIELD_NAME,
          keyRef
        )
      }
      variant="outlined"
      required={REQUIRED}
      disabled={DISABLED}
      fullWidth
      multiline
      minRows={5}
      maxRows={10}
    />
  );
};

export default React.memo(Textarea);
