/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import {
  Backdrop,
  Box,
  Button,
  Container,
  Fade,
  Grid,
  Modal,
  Paper,
} from "@mui/material";
import FormLayout from "../../templates/FormLayout";
import Textfield from "../../fields/Textfield";
import Dropdown from "../../fields/Dropdown";
import DateField from "../../fields/DateField";
import EmailField from "../../fields/EmailField";
import PhoneNumberField from "../../fields/PhoneNumberField";
import Address from "../../fields/Address";
import Experience from "../../fields/Experience";
import Education from "../../fields/Education";
import { fetchCountryList, fetchStatesByCountry } from "../../services/apis";
import Attachment from "../../fields/Attachment";
import Number from "../../fields/Number";

import CircularProgress from "@mui/material/CircularProgress";
import { useLocation } from "react-router-dom";
import useAxiosInstance from "../../hooks/useAxiosInstance";

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
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 1.5,
    paddingRight: 1.5,
    borderRadius: 5,
  },
};

const formDataReducer = (state, action) => {
  switch (action.type) {
    case "SET_FORM_DATA":
      return action.payload;

    case "SET_COUNTRY_OPTIONS": {
      const { countryList } = action.payload;
      return {
        ...state,
        ["Address"]: {
          ...state["Address"],
          SUB_FIELDS: {
            ...state["Address"].SUB_FIELDS,
            ["Country"]: {
              ...state["Address"].SUB_FIELDS["Country"],
              OPTIONS: countryList,
            },
          },
        },
      };
    }

    case "UPDATE_STATE_OPTIONS":
      return {
        ...state,
        ["Address"]: {
          ...state["Address"],
          SUB_FIELDS: {
            ...state["Address"]?.SUB_FIELDS,
            ["State/Province"]: {
              ...state["Address"]?.SUB_FIELDS["State/Province"],
              DISABLED: false,
              OPTIONS: fetchStatesByCountry(
                state?.["Address"]?.SUB_FIELDS?.["Country"]?.VALUE
              ),
            },
          },
        },
      };

    case "UPDATE_FIELD": {
      const { value, fieldName, parentFieldName, keyRef } = action.payload;

      if (keyRef) {
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
      if (keyRef) {
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
                  ERROR: error,
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
                ERROR: error,
              },
            },
          },
        };
      } else {
        return {
          ...state,
          [fieldName]: {
            ...state[fieldName],
            ERROR: error,
          },
        };
      }
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

    case "TOGGLE_DISABLE_END_DATE": {
      const { childKeyName, checked } = action.payload;
      return {
        ...state,
        ["Experience"]: {
          ...state["Experience"],
          CHILDREN: {
            ...state["Experience"].CHILDREN,
            [childKeyName]: {
              ...state["Experience"].CHILDREN[childKeyName],
              ["End Date"]: {
                ...state["Experience"].CHILDREN[childKeyName]["End Date"],
                DISABLED: checked,
                REQUIRED: !checked,
              },
            },
          },
        },
      };
    }

    default:
      return state;
  }
};

const JobForm = () => {
  const [formData, dispatchFormData] = useReducer(formDataReducer, null);
  const [jobId, setJobId] = useState(null);

  const countryList = useMemo(() => fetchCountryList(), []);

  const [loader, setLoader] = useState(false);
  const handleLoaderOpen = () => setLoader(true);
  const handleLoaderClose = () => setLoader(false);

  const [open, setOpen] = useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

  const location = useLocation();
  const instance = useAxiosInstance();

  useEffect(() => {
    dispatchFormData({ type: "SET_FORM_DATA", payload: FormLayout });
    dispatchFormData({
      type: "SET_COUNTRY_OPTIONS",
      payload: { countryList },
    });
    const searchParams = new URLSearchParams(location.search);
    const JOB_ID = searchParams.get("jobid");
    setJobId(JOB_ID);
  }, [countryList, location.search]);

  useEffect(() => {
    dispatchFormData({ type: "UPDATE_STATE_OPTIONS" });
  }, [formData?.["Address"]?.SUB_FIELDS?.["Country"]?.VALUE]);

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
        return (
          <Textfield
            {...field}
            handleOnChange={handleOnChange}
            setError={setError}
          />
        );

      case "Date":
        return (
          <DateField
            {...field}
            handleOnChange={handleOnChange}
            dispatchFormData={dispatchFormData}
            setError={setError}
          />
        );

      case "Dropdown":
        return (
          <Dropdown
            {...field}
            handleOnChange={handleOnChange}
            setError={setError}
          />
        );

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
        return (
          <Address
            {...field}
            handleOnChange={handleOnChange}
            setError={setError}
          />
        );

      case "Experience":
        return (
          <Experience
            {...field}
            handleOnChange={handleOnChange}
            setError={setError}
            dispatchFormData={dispatchFormData}
          />
        );

      case "Education":
        return (
          <Education
            {...field}
            handleOnChange={handleOnChange}
            setError={setError}
            dispatchFormData={dispatchFormData}
          />
        );

      case "Number":
        return (
          <Number
            {...field}
            handleOnChange={handleOnChange}
            setError={setError}
          />
        );

      case "Attachment":
        return (
          <Attachment
            {...field}
            handleOnChange={handleOnChange}
            setError={setError}
            dispatchFormData={dispatchFormData}
          />
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      handleLoaderOpen();
      let DATA = {};
      Object.values(formData).forEach((field) => {
        const data = {};
        if (field.CHILDREN) {
          const childrenData = {};
          Object.entries(field.CHILDREN).forEach(([childKey, childField]) => {
            const subFieldsData = {};
            Object.values(childField).forEach((childSubField) => {
              if (childSubField.ERROR) {
                const error = new Error("Some fields have invalid value!");
                error.focus = `${childSubField.FIELD_NAME}*${field.FIELD_NAME}*${childKey}`;
                throw error;
              }
              if (
                childSubField.REQUIRED &&
                (childSubField.VALUE === "" || childSubField.VALUE === null)
              ) {
                const error = new Error("All required fields must be filled!");
                error.focus = `${childSubField.FIELD_NAME}*${field.FIELD_NAME}*${childKey}`;
                throw error;
              }
              subFieldsData[childSubField.FIELD_NAME] = childSubField.VALUE;
            });

            childrenData[childKey] = subFieldsData;
          });

          data[field.FIELD_NAME] = childrenData;
        } else if (field.SUB_FIELDS) {
          const subFieldsData = {};
          Object.values(field.SUB_FIELDS).forEach((subField) => {
            if (subField.ERROR) {
              const error = new Error("Some fields have invalid value!");
              error.focus = `${subField.FIELD_NAME}*${field.FIELD_NAME}`;
              throw error;
            }
            if (
              subField.REQUIRED &&
              (subField.VALUE === "" || subField.VALUE === null)
            ) {
              const error = new Error("All required fields must be filled!");
              error.focus = `${subField.FIELD_NAME}*${field.FIELD_NAME}`;
              throw error;
            }

            subFieldsData[subField.FIELD_NAME] = subField.VALUE;
          });

          data[field.FIELD_NAME] = subFieldsData;
        } else {
          if (field.ERROR) {
            const error = new Error("Some fields have invalid value!");
            error.focus = `${field.FIELD_NAME}`;
            throw error;
          }
          if (field.REQUIRED && (field.VALUE === "" || field.VALUE === null)) {
            const error = new Error("All required fields must be filled!");
            error.focus = `${field.FIELD_NAME}`;
            throw error;
          }
          data[field.FIELD_NAME] = field.VALUE;
        }
        DATA = {
          ...DATA,
          ...data,
        };
      });
      console.log(DATA)
      const res = await instance.post("/application/submit", {
        DATA,
        JOB_ID: jobId,
      });
      handleLoaderClose();
      handleModalOpen();
    } catch (error) {
      console.log(error);
      // console.error(error.message);
      const [fieldName, parentFieldName, keyRef] = error.focus.split("*");
      dispatchFormData({
        type: "SET_ERROR",
        payload: {
          error: true,
          fieldName,
          parentFieldName,
          keyRef,
        },
      });
    } finally {
      handleLoaderClose();
    }
  };

  return (
    <Container>
      <form onSubmit={(event) => handleSubmit(event)}>
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
                >
                  {"Let's Go"}
                </Button>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Paper>
      </form>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        open={open}
        onClose={handleModalClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              ...styles.modalStyle,
              height: window.innerWidth <= 900 ? "10vh" : "15vh",
              width: window.innerWidth <= 900 ? "80vw" : "30vw",
            }}
          >
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default JobForm;
