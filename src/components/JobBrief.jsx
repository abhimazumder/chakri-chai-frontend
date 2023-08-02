/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Chip,
  Container,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded"; // Work Mode Icon
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded"; // Rupee Icon
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded"; // Dollar Icon
import EuroRoundedIcon from "@mui/icons-material/EuroRounded"; // Euro Icon
import CurrencyYenRoundedIcon from "@mui/icons-material/CurrencyYenRounded"; // Yen/Yuan Icon
import CurrencyPoundRoundedIcon from "@mui/icons-material/CurrencyPoundRounded"; // Pound Icon
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
      marginBottom: 1,
      borderRadius: 3,
    },
    backIconStyle: {
      color: "grey",
      fontSize: "2.5rem",
      cursor: "pointer",
    },
  };

  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    setJobData(SampleJob);
  }, []);

  const generateFeatures = (jobFeatures, featureName, index) => {
    const feature = jobFeatures[featureName];
    switch (featureName) {
      case "REQUIRED_EXPERIENCE":
        return (
          <Tooltip title={"Required Experience"} arrow key={index}>
            <Grid item xs="auto">
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
          </Tooltip>
        );

      case "COMPENSATION":
        return (
          <Tooltip title={"Compensation"} arrow key={index}>
            <Grid item xs="auto">
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
          </Tooltip>
        );

      case "EMPLOYMENT_TYPE":
        return (
          <Tooltip title={"Employment Type"} arrow key={index}>
            <Grid item xs="auto">
              <Chip size="large" label={`${feature}`} />
            </Grid>
          </Tooltip>
        );

      case "WORK_MODE":
        return (
          <Tooltip title={"Work Mode"} arrow key={index}>
            <Grid item xs="auto">
              <Chip
                size="large"
                icon={<HomeWorkRoundedIcon />}
                label={`${feature}`}
              />
            </Grid>
          </Tooltip>
        );

      case "OPENNINGS":
        return (
          <Tooltip title={"Opennings"} arrow key={index}>
            <Grid item xs="auto">
              <Chip
                size="large"
                icon={<PeopleRoundedIcon />}
                label={`${feature}`}
              />
            </Grid>
          </Tooltip>
        );

      default:
        return null;
    }
  };

  const generateLocations = (jobLocations, countryName, index) => {
    let cityList = jobLocations[countryName][0];
    if (jobLocations[countryName].length > 1)
      for (let i = 1; i < jobLocations[countryName].length; i++) {
        const city = jobLocations[countryName][i];
        cityList += " | " + city;
      }
    return (
      <Grid item xs={"auto"} key={index}>
        <Chip size="small" label={`${countryName} - ${cityList}`} />
      </Grid>
    );
  };

  return (
      <Container>
        <Paper elevation={3} sx={styles.roundedPaper}>
        <Grid container spacing={2}>
          <Grid item xs={9} key={"BACK_ICON"}>
            <ArrowBackRoundedIcon
              style={styles.backIconStyle}
              onClick={() => navigate(-1)}
            />
          </Grid>
          <Grid item xs={3} textAlign="right" key={"JOB_ID"}>
            <Typography
              sx={styles.slantedText}
            >
              Job ID: {jobData && jobData?.META_DATA?.JOB_ID}
            </Typography>
          </Grid>
          <Grid item xs={12} key={"JOB_TITLE"}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {jobData && jobData?.META_DATA?.JOB_TITLE}
            </Typography>
          </Grid>
          <Grid item xs={12} key={"JOB_LOCATIONS"}>
            <Grid container alignItems="left" spacing={1}>
              {jobData &&
                Object.keys(jobData?.META_DATA?.JOB_LOCATIONS).map((countryName, index) =>
                  generateLocations(jobData?.META_DATA?.JOB_LOCATIONS, countryName, index)
                )}
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 30 }} key={"JOB_FEATURES"}>
            <Grid container alignItems="left" spacing={2}>
              {jobData &&
                Object.keys(jobData?.META_DATA?.JOB_FEATURES).map((featureName, index) =>
                  generateFeatures(jobData?.META_DATA?.JOB_FEATURES, featureName, index)
                )}
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 20 }} key={"DATES"}>
            <Grid container spacing={2}>
              <Grid item xs={6} key={"POSTING_DATE"}>
                <Typography>
                  Posted on: {jobData && jobData?.META_DATA?.POSTING_DATE}
                </Typography>
              </Grid>
              <Grid item xs={6} textAlign="right" key={"APPLICATION_DEADLINE"}>
                <Typography>
                  <span style={styles.asterisk}>* </span>Application deadline:{" "}
                  {jobData && jobData?.META_DATA?.APPLICATION_DEADLINE}
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
