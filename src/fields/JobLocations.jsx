/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Chip, Grid, InputLabel, Typography } from "@mui/material";
import React from "react";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import Textfield from "./Textfield";
import Dropdown from "./Dropdown";

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
  addSectionStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "auto",
    border: "4px solid grey",
    borderRadius: 45,
    color: "grey",
    padding: 1,
    cursor: "pointer",
  },
  addSectionIconStyle: {
    marginRight: 2,
    fontSize: "2rem",
  },
};

const JobLocations = ({
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
      case "Textfield":
        return <Textfield {...field} handleOnChange={handleOnChange} />;

      case "Dropdown":
        return <Dropdown {...field} handleOnChange={handleOnChange} />;

      default:
        return null;
    }
  };

  const createLocationObject = () => {
    let flag = false;
    const newLocationObject = {};
    Object.values(SUB_FIELDS).forEach((subField) => {
      if (subField?.VALUE === "") flag = true;
      newLocationObject[subField?.FIELD_NAME] = subField?.VALUE;
    });

    if (flag) return;

    const locationObjectArray = VALUE;
    if (locationObjectArray.length === 0) {
      newLocationObject.ID = 0;
    } else {
      const lastElement = locationObjectArray.slice(-1);
      newLocationObject.ID = lastElement[0]?.ID + 1;
    }
    dispatchFormData({
      type: "CREATE_LOCATION_OBJECT",
      payload: newLocationObject,
    });
  };

  const generateLocationChip = (location) => {
    return (
      <Grid item xs={"auto"} key={location.ID}>
        <Chip
          size="medium"
          label={`${location.Country} - ${location.City}`}
          onDelete={() => removeLocationObject(location.ID)}
        />
      </Grid>
    );
  };

  const removeLocationObject = (id) => {
    dispatchFormData({ type: "REMOVE_LOCATION_OBJECT", payload: id });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid
            item
            xs="auto"
            alignItems="flex-start"
            justifyContent="flex-start"
            key={`${FIELD_NAME}-label`}
          >
            <InputLabel>{FIELD_LABEL}</InputLabel>
            <Typography variant="body2" sx={{ color: "grey" }}>
              {`Click on the plus icon to add ${FIELD_LABEL.toLowerCase()}`}
            </Typography>
          </Grid>
          <Grid
            item
            xs="auto"
            alignItems="flex-end"
            justifyContent="flex-end"
            key={`${FIELD_NAME}-icon`}
          >
            <AddCircleOutlineOutlined
              style={styles.addIconStyle}
              onClick={() => createLocationObject()}
            />
          </Grid>
        </Grid>
      </Grid>
      {Object.values(SUB_FIELDS).map((field) => (
        <Grid item xs={12} sm={field?.SIZE} key={field?.FIELD_ID}>
          {getFieldJSX(field)}
        </Grid>
      ))}
      <Grid item xs={12}>
        <Grid container alignItems="left" spacing={1}>
          {VALUE.map((location) => generateLocationChip(location))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(JobLocations);
