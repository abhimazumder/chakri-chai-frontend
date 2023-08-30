/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Backdrop,
  Box,
  Button,
  Container,
  Fade,
  Grid,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
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
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCreateJobFromReduxState,
  setCreateJobFromReduxState,
} from "../../services/createJobFormSlice";
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
  cancelButton: {
    textTransform: "none",
    background: "linear-gradient(45deg, #242424, #888888)",
    borderRadius: 35,
    fontSize: "1rem",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
    fontFamily: "Montserrat, sans-serif",
    color: "#FFFFFF",
    marginLeft: 5,
    marginRight: 5,
    height: "50px",
    width: "45%",
  },
  confirmButton: {
    textTransform: "none",
    background: "linear-gradient(45deg, #ED1C24, #FF5733)",
    borderRadius: 35,
    fontSize: "1rem",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
    fontFamily: "Montserrat, sans-serif",
    color: "#FFFFFF",
    marginLeft: 5,
    marginRight: 5,
    height: "50px",
    width: "45%",
  },
  iconStyle: {
    color: "grey",
    fontSize: "2.5rem",
    cursor: "pointer",
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
  textStyle: {
    textTransform: "none",
    color: "#E03131",
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
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);

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

  const handleClearForm = () => {
    dispatchFormData({ type: "SET_FORM_DATA", payload: props.jobLayout });
    dispatch(clearCreateJobFromReduxState());
    handleModalClose();
  };

  return (
    <Container>
      <form onSubmit={(event) => handleOnSubmit(event)}>
        <Paper elevation={3} sx={styles.roundedPaper}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container rowSpacing={8} columnSpacing={2} padding={2}>
              <Grid item container xs={12} alignItems="center">
                <ArrowBackRoundedIcon
                  style={styles.iconStyle}
                  onClick={() => navigate(-1)}
                />
                <ClearRoundedIcon
                  style={{ ...styles.iconStyle, marginLeft: "auto" }}
                  onClick={handleModalOpen}
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
                  <Grid container spacing={2}>
                    <Grid item xs={12} container justifyContent="center">
                      <Typography style={styles.textStyle}>
                        {"Are you sure you want to clear the form?"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} container justifyContent="center">
                      <Button
                        style={styles.cancelButton}
                        onClick={handleModalClose}
                      >
                        {"Cancel"}
                      </Button>
                      <Button
                        style={styles.confirmButton}
                        onClick={() => handleClearForm()}
                      >
                        {"Clear"}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Fade>
            </Modal>
          </LocalizationProvider>
        </Paper>
      </form>
    </Container>
  );
};

export default CreateJobForm;
