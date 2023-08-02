/* eslint-disable no-unused-vars */
import React from "react";
import { Paper } from "@mui/material";
import "@fontsource/montserrat";
import MiniTable from "../../components/MiniTable";

const styles = {
  roundedPaper: {
    padding: 20,
    marginBottom: 1,
    borderRadius: 8,
    height: "330px",
    overflowX: "auto",
  },
};

const MiniJobApplications = () => {

  const headerNames = [
    {HEADER_LABEL: "Applicant Name", HEADER_ID: "Applicant Name"},
    {HEADER_LABEL: "Job Name", HEADER_ID: "Job Name"},
    {HEADER_LABEL: "Applied On", HEADER_ID: "Applied On"},
  ]

  return (
    <Paper elevation={3} style={styles.roundedPaper}>
      <MiniTable headerNames={headerNames} rows={[]}/>
    </Paper>
  );
};

export default MiniJobApplications;
