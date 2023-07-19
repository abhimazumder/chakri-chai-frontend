/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { Grid } from "@mui/material";
import JobList from "../../templates/JobList";

const JobListIndex = () => {
  const [jobListData, setJobListData] = useState(null);

  useEffect(() => {
    console.log(JobList);
    setJobListData(JobList);
  }, []);

  return (
    <Grid container spacing={2}>
      {jobListData &&
        jobListData.map((jobData) => (
          <Grid item xs={12} key={jobData.JOB_ID}>
            <JobCard jobData={jobData} />
          </Grid>
        ))}
    </Grid>
  );
};

export default JobListIndex;
