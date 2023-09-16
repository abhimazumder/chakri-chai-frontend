/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import "@fontsource/montserrat";
import MiniTable from "../../components/MiniTable";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const styles = {
  roundedPaper: {
    padding: 20,
    marginBottom: 1,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    height: "340px",
    overflowX: "auto",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    marginTop: 8,
    marginBottom: 8,
  },
  tableTitle: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 15,
    width: "100%",
  },
  table: {
    flex: 1,
  },
  tableLink: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 15,
    display: "flex",
    justifyContent: "center",
    marginTop: "auto",
  },
};

const MiniJobApplications = ({ rows }) => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userAuth.user.USER_ID);

  const headerNames = [
    { HEADER_LABEL: "Applicantion ID", HEADER_ID: "APPLICATION_ID" },
    { HEADER_LABEL: "Applicant Name", HEADER_ID: "APPLICANT_NAME" },
    { HEADER_LABEL: "Job Title", HEADER_ID: "JOB_TITLE" },
    { HEADER_LABEL: "Applied On", HEADER_ID: "APPLIED_ON" },
  ];

  return (
    <Paper elevation={3} style={styles.roundedPaper}>
      <Typography style={styles.tableTitle}>
        {"Recent applications on your job postings"}
      </Typography>
      <Box style={styles.contentContainer}>
        <Box style={styles.table}>
          <MiniTable headerNames={headerNames} rows={rows} />
        </Box>
        <Box style={styles.tableLink}>
          <Link
            component="button"
            onClick={() => {
              navigate(`/jobapplications`);
            }}
            underline="hover"
            style={{ color: "#ED1C24" }}
          >
            {"View More"}
          </Link>
        </Box>
      </Box>
    </Paper>
  );
};

export default MiniJobApplications;
