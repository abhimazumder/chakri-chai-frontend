/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Chip, Grid, InputLabel, Typography } from "@mui/material";
import React from "react";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import Textfield from "./Textfield";
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

const RequiredExperience = (props) => {
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
    SUB_FIELDS,
    VALUE,
    keyRef,
    handleOnChange,
    dispatchFormData,
  } = props;

  const getFieldJSX = (field) => {
    switch (field.FIELD_TYPE) {
      case "Textfield":
        return <Textfield {...field} handleOnChange={handleOnChange} />;

      case "Number":
        return <Number {...field} handleOnChange={handleOnChange} />;

      case "Dropdown":
        return <Dropdown {...field} handleOnChange={handleOnChange} />;

      default:
        return null;
    }
  };

  const createExperienceObject = () => {
    let flag = false;
    let newExperienceObject = {...VALUE};
    Object.values(SUB_FIELDS).forEach((subField) => {
      if (subField.VALUE === "") flag = true;
    });

    if (flag) return;

    if (SUB_FIELDS["Range Type"].VALUE === "Absolute") {
        newExperienceObject = {
        RANGE: {
          [SUB_FIELDS["Range Type"].VALUE.toUpperCase()]: SUB_FIELDS["Range Value"].VALUE,
        },
        UNIT: SUB_FIELDS["Unit"].VALUE,
      };
    } else {
        newExperienceObject = {
        RANGE: {
          ...newExperienceObject?.RANGE,
          [SUB_FIELDS["Range Type"].VALUE.toUpperCase()]: SUB_FIELDS["Range Value"].VALUE,
        },
        UNIT: SUB_FIELDS["Unit"].VALUE,
      };
      delete newExperienceObject?.RANGE?.ABSOLUTE;
    }
    dispatchFormData({type: 'CREATE_EXPERIENCE_OBJECT', payload: newExperienceObject});
  };

  const removeExperienceObject = () => {
    dispatchFormData({type: 'REMOVE_EXPERIENCE_OBJECT'});
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
              onClick={() => createExperienceObject()}
            />
          </Grid>
        </Grid>
      </Grid>
      {Object.values(SUB_FIELDS).map((field) => {
        return (
          <Grid item xs={12} sm={field?.SIZE} key={field?.FIELD_ID}>
            {getFieldJSX(field)}
          </Grid>
        );
      })}
      <Grid item xs={12} key="experience-chip">
        {Object.keys(VALUE).length !== 0 && (
          <Chip
            size="large"
            icon={<WorkRoundedIcon />}
            label={
              Object.keys(VALUE?.RANGE).length === 2
                ? `${VALUE?.RANGE?.MINIMUM} - ${VALUE?.RANGE?.MAXIMUM} ${VALUE.UNIT}`
                : VALUE?.RANGE?.MINIMUM
                ? `> ${VALUE?.RANGE?.MINIMUM} ${VALUE.UNIT}`
                : VALUE?.RANGE?.MAXIMUM
                ? `< ${VALUE?.RANGE?.MAXIMUM} ${VALUE.UNIT}`
                : VALUE?.RANGE?.ABSOLUTE
                ? `${VALUE?.RANGE?.ABSOLUTE} ${VALUE.UNIT}`
                : ""
            }
            onDelete={() => removeExperienceObject()}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default React.memo(RequiredExperience);
