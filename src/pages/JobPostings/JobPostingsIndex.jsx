/* eslint-disable no-unused-vars */
import { Button, Container, Grid, Paper } from "@mui/material";
import React from "react";

import "@fontsource/montserrat";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { useNavigate } from "react-router-dom";
import JobTable from "./JobTable";
import { useSelector } from "react-redux";

const styles = {
  roundedPaper: {
    padding: 20,
    marginBottom: 1,
    borderRadius: 8,
    overflowX: "auto",
  },
  backIconStyle: {
    color: "grey",
    fontSize: "2.5rem",
    cursor: "pointer",
  },
  buttonStyle: {
    textTransform: "none",
    backgroundColor: "#ED1C24",
    background: "linear-gradient(45deg, #ED1C24, #FF5733)",
    borderRadius: 50,
    width: 180,
    height: 40,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
    fontFamily: "Montserrat, sans-serif",
  },
};

const JobPostingsIndex = () => {

  const navigate = useNavigate();
  const userId = useSelector(state => state.userAuth.user.USER_ID);

  return (
    <Container>
      <Paper elevation={3} style={styles.roundedPaper}>
        <Grid container spacing={2}>
          <Grid item container xs={12} alignItems="center">
            <ArrowBackRoundedIcon
              style={styles.backIconStyle}
              onClick={() => navigate(-1)}
            />
            <Button
              variant="contained"
              style={{ ...styles.buttonStyle, marginLeft: "auto" }}
              endIcon={<OpenInNewIcon />}
              onClick={() => navigate(`/joblist?userid=${userId}`)}
            >
              {"View Public Site"}
            </Button>
          </Grid>

          <Grid item xs={12} style={{ minHeight: 200 }}>
            <JobTable />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default JobPostingsIndex;
