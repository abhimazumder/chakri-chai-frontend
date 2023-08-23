/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Container, Grid, Paper } from "@mui/material";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Textfield from "../../fields/Textfield";
import Dropdown from "../../fields/Dropdown";
import JobLocations from "../../fields/JobLocations";
import RequiredExperience from "../../fields/RequiredExperience";
import Number from "../../fields/Number";
import Compensation from "../../fields/Compensation";
import Description from "../../fields/Description";
import DateField from "../../fields/DateField";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCreateJobFromReduxState } from "../../services/createJobFormSlice";
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
  previewButton: {
    textTransform: "none",
    backgroundColor: "#242424",
    background: "linear-gradient(45deg, #242424, #888888)",
    borderRadius: 50,
    width: 120,
    height: 40,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
    margin: 3,
    fontFamily: "Montserrat, sans-serif",
  },
  backIconStyle: {
    color: "grey",
    fontSize: "2.5rem",
    cursor: "pointer",
  },
};

const isNullish = (field) => {
  if (field?.REQUIRED === true) {
    if (
      field?.value === null ||
      field?.value === undefined ||
      field?.value === ""
    ) {
      return true;
    }
  }
  return false;
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
                  ERROR: isNullish(value),
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
                ERROR: isNullish(value),
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
            ERROR: isNullish(value),
          },
        };
      }
    }

    case "CREATE_LOCATION_OBJECT": {
      const newValue = [...state["Job Locations"].VALUE];
      newValue.push(action.payload);
      return {
        ...state,
        ["Job Locations"]: {
          ...state["Job Locations"],
          SUB_FIELDS: {
            ...state["Job Locations"].SUB_FIELDS,
            ["Country"]: {
              ...state["Job Locations"].SUB_FIELDS["Country"],
              VALUE: "",
            },
            ["City"]: {
              ...state["Job Locations"].SUB_FIELDS["City"],
              VALUE: "",
            },
          },
          VALUE: newValue,
        },
      };
    }

    case "REMOVE_LOCATION_OBJECT": {
      const oldValue = state["Job Locations"].VALUE;
      const newValue = oldValue.filter((location) => {
        return location.ID !== action.payload;
      });
      return {
        ...state,
        ["Job Locations"]: {
          ...state["Job Locations"],
          VALUE: newValue,
        },
      };
    }

    case "CREATE_EXPERIENCE_OBJECT": {
      return {
        ...state,
        ["Required Experience"]: {
          ...state["Required Experience"],
          SUB_FIELDS: {
            ...state["Required Experience"].SUB_FIELDS,
            ["Range Type"]: {
              ...state["Required Experience"].SUB_FIELDS["Range Type"],
              VALUE: "",
            },
            ["Range Value"]: {
              ...state["Required Experience"].SUB_FIELDS["Range Value"],
              VALUE: "",
            },
            ["Unit"]: {
              ...state["Required Experience"].SUB_FIELDS["Unit"],
              VALUE: "",
            },
          },
          VALUE: action.payload,
        },
      };
    }

    case "REMOVE_EXPERIENCE_OBJECT": {
      return {
        ...state,
        ["Required Experience"]: {
          ...state["Required Experience"],
          VALUE: {},
        },
      };
    }

    case "CREATE_COMPENSATION_OBJECT": {
      return {
        ...state,
        ["Compensation"]: {
          ...state["Compensation"],
          SUB_FIELDS: {
            ...state["Compensation"].SUB_FIELDS,
            ["Range Type"]: {
              ...state["Compensation"].SUB_FIELDS["Range Type"],
              VALUE: "",
            },
            ["Range Value"]: {
              ...state["Compensation"].SUB_FIELDS["Range Value"],
              VALUE: "",
            },
            ["Currency"]: {
              ...state["Compensation"].SUB_FIELDS["Currency"],
              VALUE: "",
            },
          },
          VALUE: action.payload,
        },
      };
    }

    case "REMOVE_COMPENSATION_OBJECT": {
      return {
        ...state,
        ["Compensation"]: {
          ...state["Compensation"],
          VALUE: {},
        },
      };
    }

    case "CREATE_SECTION_OBJECT": {
      return {
        ...state,
        ["Description"]: {
          ...state["Description"],
          CHILDREN: {
            ...state["Description"].CHILDREN,
            [action.payload.newKey]: action.payload.newVal,
          },
        },
      };
    }

    case "REMOVE_SECTION_OBJECT": {
      const updatedDescriptionChildren = { ...state["Description"].CHILDREN };
      delete updatedDescriptionChildren[action.payload];

      return {
        ...state,
        ["Description"]: {
          ...state["Description"],
          CHILDREN: updatedDescriptionChildren,
        },
      };
    }

    default:
      return state;
  }
};

const CreateJobForm = (props) => {
  const [formData, dispatchFormData] = useReducer(formDataReducer, null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const instance = useAxiosInstance();
  const userId = useSelector((state) => state.userAuth?.user?.USER_ID);

  useEffect(() => {
    dispatchFormData({ type: "SET_FORM_DATA", payload: props.jobLayout });
  }, [props.jobLayout]);

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
        return <Textfield {...field} handleOnChange={handleOnChange} />;

      case "Dropdown":
        return <Dropdown {...field} handleOnChange={handleOnChange} />;

      case "Number":
        return <Number {...field} handleOnChange={handleOnChange} />;

      case "Job Locations":
        return (
          <JobLocations
            {...field}
            handleOnChange={handleOnChange}
            dispatchFormData={dispatchFormData}
          />
        );

      case "Date":
        return (
          <DateField
            {...field}
            handleOnChange={handleOnChange}
            dispatchFormData={dispatchFormData}
          />
        );

      case "Required Experience":
        return (
          <RequiredExperience
            {...field}
            handleOnChange={handleOnChange}
            dispatchFormData={dispatchFormData}
          />
        );

      case "Compensation":
        return (
          <Compensation
            {...field}
            handleOnChange={handleOnChange}
            dispatchFormData={dispatchFormData}
          />
        );

      case "Description":
        return (
          <Description
            {...field}
            handleOnChange={handleOnChange}
            dispatchFormData={dispatchFormData}
          />
        );

      default:
        return null;
    }
  };

  const formatData = (formData) => {
    const DATA = {};
    Object.values(formData).forEach((field) => {
      switch (field.FIELD_TYPE) {
        case "Date":
          DATA[field.FIELD_NAME] = field.VALUE?.toString();
          break;

        case "Description":
          DATA[field.FIELD_NAME] = Object.values(field.CHILDREN).map(
            (child) => {
              const value = {};
              Object.values(child).forEach((childField) => {
                value[childField.FIELD_NAME] = childField.VALUE;
              });
              return value;
            }
          );
          break;

        default:
          DATA[field.FIELD_NAME] = field.VALUE;
          break;
      }
    });
    return DATA;
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    dispatch(setCreateJobFromReduxState({ formData: formData }));
    const DATA = formatData(formData);
    DATA["Active Status"] = false;
    DATA["User ID"] = userId;
    console.log(DATA);
    try {
      const res = await instance.post("/jobs/createjob", { DATA });
      const url = `/jobinfo?jobid=${DATA["Job ID"]}`;
      navigate(url);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <Container>
      <form onSubmit={(event) => handleOnSubmit(event)}>
        <Paper elevation={3} sx={styles.roundedPaper}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container rowSpacing={8} columnSpacing={2} padding={2}>
              <Grid item xs={9} key={"BACK_ICON"}>
                <ArrowBackRoundedIcon
                  style={styles.backIconStyle}
                  onClick={() => navigate(-1)}
                />
              </Grid>
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
                  {"Save"}
                </Button>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Paper>
      </form>
    </Container>
  );
};

export default CreateJobForm;
