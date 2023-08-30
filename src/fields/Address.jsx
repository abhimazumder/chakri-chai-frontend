/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Grid, InputLabel } from "@mui/material";
import React from "react";
import Dropdown from "./Dropdown";
import Textfield from "./Textfield";
import Number from "./Number";

const Address = ({
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
  SUB_FIELDS,
  ERROR,
  VALUE,
  keyRef,
  handleOnChange,
  setError,
  dispatchFormData,
}) => {
  const getFieldJSX = (field) => {
    switch (field.FIELD_TYPE) {
      case "Dropdown":
        return <Dropdown {...field} handleOnChange={handleOnChange} />;

      case "Textfield":
        return <Textfield {...field} handleOnChange={handleOnChange} />;

      case "Number":
        return <Number {...field} handleOnChange={handleOnChange} />;

      default:
        return null;
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} key={`${FIELD_ID}-label`}>
        <InputLabel style={{ paddingTop: 20 }}>{FIELD_LABEL}</InputLabel>
      </Grid>
      {Object.values(SUB_FIELDS).map((subField) => (
        <Grid item xs={12} sm={subField?.SIZE} key={subField?.FIELD_ID}>
          {getFieldJSX(subField)}
        </Grid>
      ))}
    </Grid>
  );
};

export default React.memo(Address);
