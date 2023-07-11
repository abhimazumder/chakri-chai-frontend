/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Chip, Container, Grid, Paper, Typography } from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded"; // Work Mode Icon
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded"; //Rupee Icon
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded"; //Dollar Icon
import EuroRoundedIcon from "@mui/icons-material/EuroRounded"; // Euro Icon
import CurrencyYenRoundedIcon from "@mui/icons-material/CurrencyYenRounded"; // Yen/Yuan Icon
import CurrencyPoundRoundedIcon from "@mui/icons-material/CurrencyPoundRounded"; //Pound Icon
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded"; // Other currency symbol Icon
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";

import { SampleJob } from "../templates/SampleJob";
import { useNavigate } from "react-router-dom";

const JobBrief = () => {
  const styles = {
    slantedText: {
      transform: "skew(-10deg)",
      marginLeft: "auto",
    },
    asterisk: {
      color: "red",
      marginRight: "2px",
    },
    roundedPaper: {
      padding: 2,
      borderRadius: 3,
    },
    backIconStyle: {
      color: "grey",
      fontSize: "2.5rem",
      cursor: "pointer",
    },
  };

  const [jobData, setJobData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setJobData(SampleJob);
    console.log(jobData);
  }, []);

  const generateFeatures = (jobFeatures, featureName) => {
    const feature = jobFeatures[featureName];
    switch (featureName) {
      case "REQUIRED_EXPERIENCE":
        return (
          <Grid item xs="auto" key={featureName}>
            <Chip
              size="large"
              icon={<WorkRoundedIcon />}
              label={
                Object.keys(feature?.RANGE).length === 2
                  ? `${feature?.RANGE?.MINIMUM} - ${feature?.RANGE?.MAXIMUM} ${feature.UNIT}`
                  : feature?.RANGE?.MINIMUM
                  ? `> ${feature?.RANGE?.MINIMUM} ${feature.UNIT}`
                  : feature?.RANGE?.MAXIMUM
                  ? `< ${feature?.RANGE?.MAXIMUM} ${feature.UNIT}`
                  : feature?.RANGE?.ABSOLUTE
                  ? `${feature?.RANGE?.ABSOLUTE} ${feature.UNIT}`
                  : ""
              }
            />
          </Grid>
        );

      case "COMPENSATION":
        return (
          <Grid item xs="auto" key={featureName}>
            <Chip
              size="large"
              icon={
                feature?.CURRENCY === "RUPEE" ? (
                  <CurrencyRupeeRoundedIcon />
                ) : feature?.CURRENCY === "DOLLAR" ? (
                  <AttachMoneyRoundedIcon />
                ) : feature?.CURRENCY === "EURO" ? (
                  <EuroRoundedIcon />
                ) : feature?.CURRENCY === "YEN/YUAN" ? (
                  <CurrencyYenRoundedIcon />
                ) : feature?.CURRENCY === "POUND" ? (
                  <CurrencyPoundRoundedIcon />
                ) : (
                  <SavingsRoundedIcon />
                )
              }
              label={
                Object.keys(feature?.RANGE).length === 2
                  ? `${feature?.RANGE?.MINIMUM} - ${feature?.RANGE?.MAXIMUM}`
                  : feature?.RANGE?.MINIMUM
                  ? `> ${feature?.RANGE?.MINIMUM}`
                  : feature?.RANGE?.MAXIMUM
                  ? `< ${feature?.RANGE?.MAXIMUM}`
                  : feature?.RANGE?.ABSOLUTE
                  ? `${feature?.RANGE?.ABSOLUTE}`
                  : ""
              }
            />
          </Grid>
        );

      case "EMPLOYMENT_TYPE":
        return (
          <Grid item xs="auto" key={featureName}>
            <Chip size="large" label={`${feature}`} />
          </Grid>
        );

      case "WORK_MODE":
        return (
          <Grid item xs="auto" key={featureName}>
            <Chip
              size="large"
              icon={<HomeWorkRoundedIcon />}
              label={`${feature}`}
            />
          </Grid>
        );

      case "OPENNINGS":
        return (
          <Grid item xs="auto" key={featureName}>
            <Chip
              size="large"
              icon={<PeopleRoundedIcon />}
              label={`${feature}`}
            />
          </Grid>
        );

      default:
        return null;
    }
  };

  const generateLocations = (jobLocations, countryName) => {
    let cityList = jobLocations[countryName][0];
    if (jobLocations[countryName].length > 1)
      for (let i = 1; i < jobLocations[countryName].length; i++) {
        const city = jobLocations[countryName][i];
        cityList += " | " + city;
      }
    return (
      <Grid item xs={"auto"} key={countryName}>
        <Chip size="small" label={`${countryName} - ${cityList}`} />
      </Grid>
    );
  };

  return (
    <Container>
      <Paper elevation={3} sx={styles.roundedPaper}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <ArrowBackRoundedIcon style={styles.backIconStyle} />
          </Grid>
          <Grid item xs={3} textAlign="right">
            <Typography sx={styles.slantedText} onClick={() => navigate(-1)}>
              Job ID: {jobData && jobData?.JOB_ID}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {jobData && jobData?.JOB_TITLE}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="left" spacing={1}>
              {jobData &&
                Object.keys(jobData?.JOB_LOCATIONS).map((countryName) =>
                  generateLocations(jobData?.JOB_LOCATIONS, countryName)
                )}
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 20 }}>
            <Grid container alignItems="left" spacing={2}>
              {jobData &&
                Object.keys(jobData?.JOB_FEATURES).map((featureName) =>
                  generateFeatures(jobData?.JOB_FEATURES, featureName)
                )}
            </Grid>
          </Grid>
          <Grid item xs={12} key="" style={{ marginTop: 20 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>
                  Posted on: {jobData && jobData?.POSTING_DATE}
                </Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography>
                  <span style={styles.asterisk}>* </span>Application deadline:{" "}
                  {jobData && jobData?.APPLICATION_DEADLINE}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default JobBrief;
