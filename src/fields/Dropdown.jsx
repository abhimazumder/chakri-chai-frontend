/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const Dropdown = (props) => {
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
    <FormControl fullWidth>
      <InputLabel id={`${FIELD_ID}-label`}>{FIELD_LABEL}</InputLabel>
      <Select
        id={FIELD_ID}
        label={FIELD_LABEL}
        labelId={`${FIELD_ID}-label`}
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
      >
        {OPTIONS.map((option) => (
          <MenuItem
            key={option.VALUE}
            id={option.ID}
            value={option.VALUE}
            disabled={option.DISABLED ? true : false}
          >
            {option.VALUE}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default React.memo(Dropdown);
