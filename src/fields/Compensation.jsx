/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Chip, Grid, InputLabel, Typography } from "@mui/material";
import React from "react";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import EuroRoundedIcon from "@mui/icons-material/EuroRounded";
import CurrencyYenRoundedIcon from "@mui/icons-material/CurrencyYenRounded";
import CurrencyPoundRoundedIcon from "@mui/icons-material/CurrencyPoundRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import Textfield from "./Textfield";
import Number from "./Number";
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

const Compensation = ({
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

  const createCompensationObject = () => {
    let flag = false;
    let newCompensationObject = { ...VALUE };
    Object.values(SUB_FIELDS).forEach((subField) => {
      if (subField.VALUE === "") flag = true;
    });

    if (flag) return;

    if (SUB_FIELDS["Range Type"].VALUE === "Absolute") {
      newCompensationObject = {
        RANGE: {
          [SUB_FIELDS["Range Type"].VALUE.toUpperCase()]:
            SUB_FIELDS["Range Value"].VALUE,
        },
        CURRENCY: SUB_FIELDS["Currency"].VALUE,
      };
    } else {
      newCompensationObject = {
        RANGE: {
          ...newCompensationObject?.RANGE,
          [SUB_FIELDS["Range Type"].VALUE.toUpperCase()]:
            SUB_FIELDS["Range Value"].VALUE,
        },
        CURRENCY: SUB_FIELDS["Currency"].VALUE,
      };
      delete newCompensationObject?.RANGE?.ABSOLUTE;
    }
    dispatchFormData({
      type: "CREATE_COMPENSATION_OBJECT",
      payload: newCompensationObject,
    });
  };

  const removeCompensationChip = () => {};

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
              onClick={() => createCompensationObject()}
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
      <Grid item xs={12} key={"compensation-chip"}>
        {Object.keys(VALUE).length !== 0 && (
          <Chip
            size="large"
            icon={
              VALUE?.CURRENCY.toUpperCase() === "RUPEE" ? (
                <CurrencyRupeeRoundedIcon />
              ) : VALUE?.CURRENCY.toUpperCase() === "DOLLAR" ? (
                <AttachMoneyRoundedIcon />
              ) : VALUE?.CURRENCY.toUpperCase() === "EURO" ? (
                <EuroRoundedIcon />
              ) : VALUE?.CURRENCY.toUpperCase() === "YEN/YUAN" ? (
                <CurrencyYenRoundedIcon />
              ) : VALUE?.CURRENCY.toUpperCase() === "POUND" ? (
                <CurrencyPoundRoundedIcon />
              ) : (
                <SavingsRoundedIcon />
              )
            }
            label={
              Object.keys(VALUE?.RANGE).length === 2
                ? `${VALUE?.RANGE?.MINIMUM} - ${VALUE?.RANGE?.MAXIMUM}`
                : VALUE?.RANGE?.MINIMUM
                ? `> ${VALUE?.RANGE?.MINIMUM}`
                : VALUE?.RANGE?.MAXIMUM
                ? `< ${VALUE?.RANGE?.MAXIMUM}`
                : VALUE?.RANGE?.ABSOLUTE
                ? `${VALUE?.RANGE?.ABSOLUTE}`
                : ""
            }
            onDelete={() => removeCompensationChip()}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default React.memo(Compensation);
