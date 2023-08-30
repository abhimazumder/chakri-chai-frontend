/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import JobBrief from "../../components/JobBrief";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { useLocation } from "react-router-dom";
import JobForm from "./JobForm";

const JobFormIndex = () => {
  const [jobData, setJobData] = useState(null);
  const location = useLocation();
  const instance = useAxiosInstance();

  const [loader, setLoader] = useState(true);
  const handleLoaderOpen = () => setLoader(true);
  const handleLoaderClose = () => setLoader(false);

  useEffect(() => {
    const setupJobInfo = async (JOB_ID) => {
      const res = await instance.post("/jobs/getjob", { JOB_ID });
      console.log("JobInfo Index", res.data);
      setJobData(res.data);
    };
    handleLoaderOpen();
    window.scrollTo(0, 0);
    const searchParams = new URLSearchParams(location.search);
    const JOB_ID = searchParams.get("jobid");
    setupJobInfo(JOB_ID);
    handleLoaderClose();
  }, [instance, location.search]);

  return (
    <Box>
      {jobData && <JobBrief metaData={jobData.META_DATA} />}
      <Box sx={{ marginTop: 2 }}>
        <JobForm/>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default JobFormIndex;
