/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useReducer, useState } from "react";
import JobCard from "./JobCard";
import { Container, Grid, Paper } from "@mui/material";
import SearchJob from "../../templates/SearchJob";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from "../../fields/Dropdown";
import SearchBar from "../../fields/SearchBar";
import useAxiosInstance from "../../hooks/useAxiosInstance";

const styles = {
  roundedPaper: {
    padding: 20,
    borderRadius: 6,
    marginBottom: 20,
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
      return {
        ...state,
        [fieldName]: {
          ...state[fieldName],
          VALUE: value,
          ERROR: isNullish(value),
        },
      };
    }

    default:
      return state;
  }
};

const JobListIndex = () => {
  const [jobListData, setJobListData] = useState([]);
  const [formData, dispatchFormData] = useReducer(formDataReducer, null);

  const instance = useAxiosInstance();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const setupJobList = async (USER_ID) => {
      const res = await instance.post("/jobs/joblist", {USER_ID});
      console.log(res.data.Items);
      setJobListData(res.data.Items);
    } 
    window.scrollTo(0, 0);
    dispatchFormData({
      type: "SET_FORM_DATA",
      payload: SearchJob,
    });
    const searchParams = new URLSearchParams(location.search);
    const USER_ID = searchParams.get("userid");
    setupJobList(USER_ID);
  }, [instance, location.search]);

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
        return <SearchBar {...field} handleOnChange={handleOnChange} />;

      case "Dropdown":
        return <Dropdown {...field} handleOnChange={handleOnChange} />;

      default:
        return null;
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={styles.roundedPaper}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
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
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        {jobListData &&
          jobListData.map((jobData) => (
            <Grid item xs={12} key={jobData.JOB_ID}>
              <JobCard jobData={jobData} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default JobListIndex;
