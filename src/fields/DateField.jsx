/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { DatePicker } from "@mui/x-date-pickers";
import React, { useEffect } from "react";

const DateField = (props) => {
  const {
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
    dispatchFormData,
  } = props;
  return (
      <DatePicker
        id={FIELD_ID}
        label={FIELD_LABEL}
        value={VALUE ? new Date(VALUE) : null}
        onChange={(value) =>
          handleOnChange(value.toISOString(), FIELD_NAME, PARENT_FIELD_NAME, keyRef)
        }
        format="yyyy-MM-dd"
        disablePast={DISABLE_PAST}
        disableFuture={DISABLE_FUTURE}
        required={REQUIRED}
        disabled={DISABLED}
        sx={{ width: "100%" }}
      />
  );
};

export default React.memo(DateField);
