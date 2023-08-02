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

const MiniJobList = () => {
  const rows = [
    {
      "Job Name": "Software Engineer - Entry Level",
      "Total Applications": 10,
      Status: true,
    },
    { "Job Name": "Job 2", "Total Applications": 5, Status: false },
    { "Job Name": "Job 3", "Total Applications": 15, Status: true },
  ];

  const headerNames = [
    { HEADER_LABEL: "Job Name", HEADER_ID: "Job Name" },
    { HEADER_LABEL: "Total Applications", HEADER_ID: "Total Applications" },
    { HEADER_LABEL: "Active Status", HEADER_ID: "Active Status" },
  ];

  return (
    <Paper elevation={3} style={styles.roundedPaper}>
      <MiniTable headerNames={headerNames} rows={rows} />
    </Paper>
  );
};

export default MiniJobList;
