/* eslint-disable no-unused-vars */
import { Container } from "@mui/material";
import React from "react";
import JobBrief from "../../components/JobBrief";
import JobDescription from "./JobDescription";

const JobInfoIndex = () => {
  return (
    <Container>
      <JobBrief />
      <div style={{ marginTop: 20 }} />
      <JobDescription />
    </Container>
  );
};

export default JobInfoIndex;
