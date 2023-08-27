/* eslint-disable no-unused-vars */
import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
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
    height: "330px",
    overflowX: "auto",
  },
  containerStyle: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableTitle: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 15,
  },
  table: {
    flex: 1,
    marginTop: 8,
    marginBottom: 8,
  },
  tableLink: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 15,
    display: "flex",
    justifyContent: "center",
  },
};

const MiniJobApplications = () => {

  const navigate = useNavigate();
  const userId = useSelector(state => state.userAuth.user.USER_ID);

  const headerNames = [
    {HEADER_LABEL: "Applicantion ID", HEADER_ID: "Applicantion ID"},
    {HEADER_LABEL: "Applicant Name", HEADER_ID: "Applicant Name"},
    {HEADER_LABEL: "Job Name", HEADER_ID: "Job Name"},
    {HEADER_LABEL: "Applied On", HEADER_ID: "Applied On"},
  ]

  const rows = {
    "89756332": {
      "Application ID": "89756332",
      "Applicant Name": "Abhishek Mazumder",
      "Job Name": "MERN Developer",
      "Applied On": "21/04/23"
    },
    "56473829": {
      "Application ID": "56473829",
      "Applicant Name": "Poulami Jash",
      "Job Name": "Data Scientist",
      "Applied On": "30/07/23"
    },
    "21345612": {
      "Application ID": "21345612",
      "Applicant Name": "Ahana Das",
      "Job Name": "Tower Operator",
      "Applied On": "31/12/23"
    }
  };

  return (
    <Paper elevation={3} style={styles.roundedPaper}>
      <Grid
        container
        style={styles.containerStyle}
      >
        <Grid item xs={12}>
          <Typography style={styles.tableTitle}>
            {"Recent applications on your job postings"}
          </Typography>
        </Grid>
        <Grid item xs={12} style={styles.table}>
          <MiniTable headerNames={headerNames} rows={rows} />
        </Grid>
        <Grid item xs={12} style={styles.tableLink}>
          <Link
            component="button"
            onClick={() => {
              navigate(`/joblist?userid=${userId}`)
            }}
            underline="hover"
            style={{ color: "#ED1C24" }}
          >
            {"View More"}
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MiniJobApplications;
