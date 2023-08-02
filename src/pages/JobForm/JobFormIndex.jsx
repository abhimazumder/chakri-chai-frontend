/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Box } from "@mui/material";
import JobFields from "./JobFields";
import JobBrief from "../../components/JobBrief";

const JobFormIndex = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box>
      <JobBrief />
      <Box sx={{ marginTop: 2 }}>
        <JobFields />
      </Box>
    </Box>
  );
};

export default JobFormIndex;
