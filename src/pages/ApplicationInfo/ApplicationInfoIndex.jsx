/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import JobBrief from "../../components/JobBrief";
import { Backdrop, CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import ApplicationInfo from "./ApplicationInfo";

const ApplicationInfoIndex = () => {
  const [metaData, setMetaData] = useState(null);
  const [applicationData, setApplicationData] = useState(null);

  const [loader, setLoader] = useState(true);
  const handleLoaderOpen = () => setLoader(true);
  const handleLoaderClose = () => setLoader(false);

  const location = useLocation();
  const instance = useAxiosInstance();

  useEffect(() => {
    const setupApplicationInfo = async (APPLICATION_ID, JOB_ID) => {
      const res1 = await instance.post("/jobs/getjob", { JOB_ID });
      setMetaData(res1.data.META_DATA);
      const res2 = await instance.post("/application/getapplication", {
        APPLICATION_ID,
      });
      setApplicationData(res2.data);
    };
    handleLoaderOpen();
    window.scrollTo(0, 0);
    const searchParams = new URLSearchParams(location.search);
    const APPLICATION_ID = searchParams.get("applicationid");
    const JOB_ID = searchParams.get("jobid");
    setupApplicationInfo(APPLICATION_ID, JOB_ID);
    handleLoaderClose();
  }, [instance, location.search]);

  return (
    <>
      {metaData && <JobBrief metaData={metaData} />}
      {applicationData && <ApplicationInfo applicationData={applicationData} />}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ApplicationInfoIndex;
