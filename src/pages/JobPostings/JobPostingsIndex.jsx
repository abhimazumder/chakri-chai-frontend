/* eslint-disable no-unused-vars */
import { Container, Grid, Paper } from "@mui/material";
import React from "react";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import { useNavigate } from "react-router-dom";
import JobTable from "./JobTable";

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
};

const JobPostingsIndex = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Paper elevation={3} style={styles.roundedPaper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ArrowBackRoundedIcon
              style={styles.backIconStyle}
              onClick={() => navigate(-1)}
            />
          </Grid>
          <Grid item xs={12} style={{ minHeight: 200 }}>
            <JobTable/>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default JobPostingsIndex;
