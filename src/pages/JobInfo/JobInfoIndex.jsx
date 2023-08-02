/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import JobBrief from "../../components/JobBrief";
import JobDescription from "./JobDescription";

const JobInfoIndex = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box>
      <JobBrief />
      <Box sx={{ marginTop: 2 }}>
        <JobDescription />
      </Box>
    </Box>
  );
};

export default JobInfoIndex;
