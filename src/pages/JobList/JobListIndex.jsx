/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { Container, Grid, Paper } from "@mui/material";
import JobList from "../../templates/JobList";
import SearchJob from "../../templates/SearchJob";
import getSearchJSX from "./getSearchJSX";

const JobListIndex = () => {

  const styles = {
    roundedPaper: {
      padding: 20,
      borderRadius: 6,
      marginBottom: 20,
    },
  }

  const [searchForm, setSearchForm] = useState(null);
  const [jobListData, setJobListData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSearchForm(SearchJob);
    setJobListData(JobList);
  }, []);

  const handleOnChange = (value, fieldName) => {
    console.log("value", value);
  }

  return (
    <Container>
      <Paper elevation={3} style={styles.roundedPaper}>
        <Grid container spacing={2}>
        {
          searchForm && Object.values(searchForm).map(field => {
            return getSearchJSX(field, handleOnChange);
          })
        }
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
