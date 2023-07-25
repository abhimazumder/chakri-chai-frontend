/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import JobBrief from "../../components/JobBrief";
import JobDescription from "./JobDescription";

const JobInfoIndex = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <JobBrief />
      <div style={{ marginTop: 20 }} />
      <JobDescription />
    </>
  );
};

export default JobInfoIndex;
