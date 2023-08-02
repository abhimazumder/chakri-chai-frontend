/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Chip, Grid, Paper, Typography } from "@mui/material";
import "@fontsource/montserrat";
import { useNavigate } from "react-router-dom";

const styles = {
  roundedPaper: {
    padding: 2,
    marginBottom: 1,
    borderRadius: 3,
  },
  responsiveGreeting: {
    wordWrap: "break-word",
    fontSize: {
      xs: "1.25rem",
      sm: "1.25rem",
      md: "1.5rem",
      lg: "1.75rem",
    },
    fontFamily: "Montserrat, sans-serif",
  },
  responsiveName: {
    wordWrap: "break-word",
    fontSize: {
      xs: "1.5rem",
      sm: "1.75rem",
      md: "2rem",
      lg: "2.5rem",
    },
    color: "#ED1C24",
    fontFamily: "Montserrat, sans-serif",
  },
  createJobButton: {
    textTransform: "none",
    borderRadius: 50,
    width: "100%",
    height: 80,
    background: "linear-gradient(45deg, #ED1C24, #FF5733)",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
    fontSize: "1.2rem",
    fontFamily: "Montserrat, sans-serif",
    color: "#FFFFFF",
  },
  centerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  chipContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
};

const TitleCard = () => {
  const navigate = useNavigate();

  return (
    <Paper elevation={3} sx={styles.roundedPaper}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h3" sx={styles.responsiveGreeting}>
                Hi,
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h1" sx={styles.responsiveName}>
                Abhishek
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={2}>
          <Grid container rowSpacing={2} sx={styles.centerContent}>
            <Grid item xs={12}>
              <Button variant="contained" sx={styles.createJobButton} onClick={() => navigate('/createjob')}>
                Create Job
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TitleCard;
