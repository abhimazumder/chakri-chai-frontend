/* eslint-disable no-unused-vars */
import { Container } from "@mui/material";
import React from "react";
import JobBrief from "../../components/JobBrief";
import JobDesciption from "./JobDesciption";

const JobInfoIndex = () => {
  return (
    <Container>
      <JobBrief />
      <div style={{ marginTop: 20 }} />
      <JobDesciption />
    </Container>
  );
};

export default JobInfoIndex;
