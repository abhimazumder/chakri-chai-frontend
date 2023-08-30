/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useReducer } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Button, Container, Grid, Paper } from "@mui/material";
import FormLayout from "../../templates/FormLayout";
import Textfield from "../../fields/Textfield";
import Dropdown from "../../fields/Dropdown";
import DateField from "../../fields/DateField";
import EmailField from "../../fields/EmailField";
import PhoneNumberField from "../../fields/PhoneNumberField";
import Address from "../../fields/Address";
import Experience from "../../fields/Experience";
import Education from "../../fields/Education";

const styles = {
  roundedPaper: {
    padding: 2,
    marginBottom: 1,
    borderRadius: 3,
  },
  submitButton: {
    textTransform: "none",
    backgroundColor: "#ED1C24",
    background: "linear-gradient(45deg, #ED1C24, #FF5733)",
    borderRadius: 50,
    width: 120,
    height: 40,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
    margin: 3,
    fontFamily: "Montserrat, sans-serif",
  },
};

const formDataReducer = (state, action) => {
  switch (action.type) {
    case "SET_FORM_DATA":
      return action.payload;

    case "UPDATE_FIELD": {
      const { value, fieldName, parentFieldName, keyRef } = action.payload;

      if (parentFieldName && keyRef) {
        return {
          ...state,
          [parentFieldName]: {
            ...state[parentFieldName],
            CHILDREN: {
              ...state[parentFieldName]?.CHILDREN,
              [keyRef]: {
                ...state[parentFieldName]?.CHILDREN?.[keyRef],
                [fieldName]: {
                  ...state[parentFieldName]?.CHILDREN?.[keyRef]?.[fieldName],
                  VALUE: value,
                },
              },
            },
          },
        };
      } else if (parentFieldName) {
        return {
          ...state,
          [parentFieldName]: {
            ...state[parentFieldName],
            SUB_FIELDS: {
              ...state[parentFieldName]?.SUB_FIELDS,
              [fieldName]: {
                ...state[parentFieldName]?.SUB_FIELDS?.[fieldName],
                VALUE: value,
              },
            },
          },
        };
      } else {
        return {
          ...state,
          [fieldName]: {
            ...state[fieldName],
            VALUE: value,
          },
        };
      }
    }

    case "SET_ERROR": {
      const { error, fieldName, parentFieldName, keyRef } = action.payload;
      return {
        ...state,
        [fieldName]: {
          ...state[fieldName],
          ERROR: error,
        },
      };
    }

    case "ADD_NEW_FIELD": {
      const { fieldName } = action.payload;
      const { CHILDREN, FIELD_NAME, SUB_FIELDS } = state[fieldName];
      const childrenKeys = Object.keys(CHILDREN);
      const childrenKeysLength = childrenKeys.length;
      const lastKeyIndex = parseInt(
        childrenKeys[childrenKeysLength - 1]?.split("-")?.pop()
      );
      let newKeyName = null;
      if (childrenKeysLength === 0 || childrenKeysLength === lastKeyIndex) {
        newKeyName = `${FIELD_NAME}-${childrenKeysLength + 1}`;
      } else {
        newKeyName = `${FIELD_NAME}-${lastKeyIndex + 1}`;
      }
      const subFields = JSON.parse(JSON.stringify(SUB_FIELDS));
      Object.values(subFields).forEach((subField) => {
        subField.FIELD_ID = `${subField.FIELD_ID}-${newKeyName}`;
      });
      return {
        ...state,
        [fieldName]: {
          ...state[fieldName],
          REQUIRED: true,
          CHILDREN: {
            ...state[fieldName]?.CHILDREN,
            [newKeyName]: subFields,
          },
        },
      };
    }

    case "REMOVE_FIELD": {
      const { childFieldName, parentFieldName } = action.payload;
      const newState = JSON.parse(JSON.stringify(state));
      delete newState[parentFieldName].CHILDREN[childFieldName];
      if (newState[parentFieldName].CHILDREN.length === 0) {
        newState[parentFieldName].REQUIRED = false;
      }
      return newState;
    }

    default:
      return state;
  }
};

const JobForm = () => {
  const [formData, dispatchFormData] = useReducer(formDataReducer, null);

  useEffect(() => {
    dispatchFormData({ type: "SET_FORM_DATA", payload: FormLayout });
  }, []);

  const setError = useCallback(
    (error, fieldName, parentFieldName = null, keyRef = null) => {
      dispatchFormData({
        type: "SET_ERROR",
        payload: {
          error,
          fieldName,
          parentFieldName,
          keyRef,
        },
      });
    },
    []
  );

  const handleOnChange = useCallback(
    (value, fieldName, parentFieldName = null, keyRef = null) => {
      dispatchFormData({
        type: "UPDATE_FIELD",
        payload: {
          value,
          fieldName,
          parentFieldName,
          keyRef,
        },
      });
    },
    []
  );

  const getFieldJSX = (field) => {
    switch (field.FIELD_TYPE) {
      case "Textfield":
        return <Textfield {...field} handleOnChange={handleOnChange} setError={setError} />;

      case "Date":
        return (
          <DateField
            {...field}
            handleOnChange={handleOnChange}
            dispatchFormData={dispatchFormData}
          />
        );

      case "Dropdown":
        return <Dropdown {...field} handleOnChange={handleOnChange} />;

      case "EmailField":
        return (
          <EmailField
            {...field}
            handleOnChange={handleOnChange}
            setError={setError}
          />
        );

      case "PhoneNumberField":
        return (
          <PhoneNumberField
            {...field}
            handleOnChange={handleOnChange}
            setError={setError}
          />
        );

      case "Address":
        return <Address {...field} handleOnChange={handleOnChange} />;

      case "Experience":
        return (
          <Experience
            {...field}
            handleOnChange={handleOnChange}
            dispatchFormData={dispatchFormData}
          />
        );

      case "Education":
        return (
          <Education
            {...field}
            handleOnChange={handleOnChange}
            dispatchFormData={dispatchFormData}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Container>
      <form onSubmit={(event) => event.preventDefault()}>
        <Paper elevation={3} sx={styles.roundedPaper}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container rowSpacing={8} columnSpacing={2} padding={2}>
                {formData &&
                  Object.values(formData).map((field) => (
                    <Grid item xs={12} sm={field?.SIZE} key={field?.FIELD_ID}>
                      {getFieldJSX(field)}
                    </Grid>
                  ))}
                <Grid item xs={12} display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    style={styles.submitButton}
                    type="submit"
                    onClick={() => console.log(formData)}
                  >
                    {"Let's Go"}
                  </Button>
                </Grid>
              </Grid>
          </LocalizationProvider>
        </Paper>
      </form>
    </Container>
  );
};

export default JobForm;
