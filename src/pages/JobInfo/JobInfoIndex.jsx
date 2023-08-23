/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import JobBrief from "../../components/JobBrief";
import JobDescription from "./JobDescription";
import { useLocation } from "react-router-dom";
import useAxiosInstance from "../../hooks/useAxiosInstance";

const JobInfoIndex = () => {
  const [jobData, setJobData] = useState(null);
  const location = useLocation();
  const instance = useAxiosInstance();

  useEffect(() => {
    const setupJobInfo = async (JOB_ID) => {
      const res = await instance.post("/jobs/getjob", { JOB_ID });
      console.log("JobInfo Index", res.data);
      setJobData(res.data);
    };

    window.scrollTo(0, 0);
    const searchParams = new URLSearchParams(location.search);
    const JOB_ID = searchParams.get("jobid");
    setupJobInfo(JOB_ID);
  }, []);

  return (
    <Box>
      {jobData && <JobBrief metaData={jobData.META_DATA} />}
      <Box sx={{ marginTop: 2 }}>
        {jobData && (
          <JobDescription
            activeStatus={jobData.ACTIVE_STATUS}
            description={jobData.DESCRIPTION}
            jobId={jobData.META_DATA.JOB_ID}
          />
        )}
      </Box>
    </Box>
  );
};

export default JobInfoIndex;
