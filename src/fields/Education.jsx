/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import DateField from "./DateField";
import Textfield from "./Textfield";
import { Grid, InputLabel } from "@mui/material";
import Dropdown from "./Dropdown";
import Number from "./Number";

const styles = {
  addIconStyle: {
    color: "grey",
    fontSize: "2.5rem",
    cursor: "pointer",
  },
  removeIconStyle: {
    color: "grey",
    fontSize: "1.7rem",
    cursor: "pointer",
  },
};

const Education = ({
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
  CHILDREN,
  ERROR,
  VALUE,
  keyRef,
  handleOnChange,
  setError,
  dispatchFormData,
}) => {
  const getFieldJSX = (field, keyRef) => {
    switch (field.FIELD_TYPE) {
      case "Dropdown":
        return (
          <Dropdown
            {...field}
            handleOnChange={handleOnChange}
            setError={setError}
            keyRef={keyRef}
          />
        );

      case "Textfield":
        return (
          <Textfield
            {...field}
            handleOnChange={handleOnChange}
            setError={setError}
            keyRef={keyRef}
          />
        );

      case "DateField":
        return (
          <DateField
            {...field}
            handleOnChange={handleOnChange}
            setError={setError}
            keyRef={keyRef}
          />
        );

      case "Number":
        return (
          <Number
            {...field}
            handleOnChange={handleOnChange}
            setError={setError}
            keyRef={keyRef}
          />
        );

      default:
        return null;
    }
  };

  const addField = () => {
    if (EXPANDABLE) {
      dispatchFormData({
        type: "ADD_NEW_FIELD",
        payload: { fieldName: FIELD_NAME },
      });
    }
  };

  const removeField = (childFieldName) => {
    dispatchFormData({
      type: "REMOVE_FIELD",
      payload: {
        childFieldName,
        parentFieldName: FIELD_NAME,
      },
    });
  };
  return (
    <Grid container spacing={2} style={{ padding: 10 }}>
      <Grid item xs={11} style={{ paddingTop: 25 }}>
        <InputLabel>
          {`Click on the plus icon to add ${FIELD_LABEL.toLowerCase()}`}
        </InputLabel>
      </Grid>
      <Grid item xs={1} alignItems="flex-end">
        <AddCircleOutlineOutlined
          style={styles.addIconStyle}
          onClick={() => addField()}
        />
      </Grid>
      <Grid item xs={12} key={`${FIELD_LABEL}-children`}>
        <Grid container spacing={2}>
          {Object.entries(CHILDREN).map(([childFieldName, childField]) => {
            return (
              <Grid item xs={12} key={childFieldName}>
                <Grid container spacing={2} style={{ paddingBottom: 40 }}>
                  <Grid item xs={12} alignItems="flex-end">
                    <RemoveCircleOutlineRoundedIcon
                      style={styles.removeIconStyle}
                      onClick={() => removeField(childFieldName)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      {Object.values(childField).map((subField) => (
                        <Grid
                          item
                          xs={12}
                          sm={subField?.SIZE}
                          key={subField?.FIELD_ID}
                        >
                          {getFieldJSX(subField, childFieldName)}
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(Education);
