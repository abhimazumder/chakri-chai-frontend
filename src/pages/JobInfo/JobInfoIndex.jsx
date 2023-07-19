/* eslint-disable no-unused-vars */
import { Container } from "@mui/material";
import React, { useEffect } from "react";
import JobBrief from "../../components/JobBrief";
import JobDescription from "./JobDescription";

const JobInfoIndex = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <Container>
      <JobBrief />
      <div style={{ marginTop: 20 }} />
      <JobDescription />
    </Container>
  );
};

export default JobInfoIndex;
