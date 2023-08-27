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

const MiniJobPostings = () => {

  const navigate = useNavigate();
  const userId = useSelector(state => state.userAuth.user.USER_ID);

  const rows = {
    52455252: {
      "Job ID": "52455252",
      "Job Name": "Software Engineer - Entry Level",
      "Total Applications": 10,
      "Active Status": true,
    },
    72453256: {
      "Job ID": "72453256",
      "Job Name": "MERN Developer",
      "Total Applications": 5,
      "Active Status": false,
    },
    92455254: {
      "Job ID": "92455254",
      "Job Name": "Assocaite Software Engineer",
      "Total Applications": 15,
      "Active Status": true,
    },
  };

  const headerNames = [
    { HEADER_LABEL: "Job ID", HEADER_ID: "Job ID" },
    { HEADER_LABEL: "Job Name", HEADER_ID: "Job Name" },
    { HEADER_LABEL: "Total Applications", HEADER_ID: "Total Applications" },
    { HEADER_LABEL: "Active Status", HEADER_ID: "Active Status" },
  ];

  return (
    <Paper elevation={3} style={styles.roundedPaper}>
      <Grid
        container
        style={styles.containerStyle}
      >
        <Grid item xs={12}>
          <Typography style={styles.tableTitle}>
            {"Your recent job postings"}
          </Typography>
        </Grid>
        <Grid item xs={12} style={styles.table}>
          <MiniTable headerNames={headerNames} rows={rows} />
        </Grid>
        <Grid item xs={12} style={styles.tableLink}>
          <Link
            component="button"
            onClick={() => {
              navigate(`/jobpostings?userid=${userId}`)
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

export default MiniJobPostings;