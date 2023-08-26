/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Box } from "@mui/material";

const OTP = (props) => {
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

  const matchIsNumeric = (text) => {
    const isNumber = typeof text === "number";
    return (isNumber || text !== "") && !isNaN(Number(text));
  };

  const validateChar = (value, index) => {
    return matchIsNumeric(value);
  };
  return (
      <MuiOtpInput
      id={FIELD_ID}
      value={VALUE}
      onChange={(value) =>
        handleOnChange(
          value,
          FIELD_NAME,
          PARENT_FIELD_NAME,
          keyRef
        )
      }
      length={4}
      validateChar={validateChar}
      display="flex"
      gap={1}
      TextFieldsProps={{ disabled: DISABLED, size: 'medium' }}
      style={{paddingLeft:"3rem", paddingRight:"3rem"}}
    />

  );
};

export default React.memo(OTP);
