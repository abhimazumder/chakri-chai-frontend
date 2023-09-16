/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import "@fontsource/montserrat";
import CakeRoundedIcon from "@mui/icons-material/CakeRounded";
import ManRoundedIcon from "@mui/icons-material/ManRounded";
import WomanRoundedIcon from "@mui/icons-material/WomanRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";

const styles = {
  boxStyle: {
    borderRadius: 10,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, .5)",
    padding: "20px",
    maxWidth: "100%",
    minHeight: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  fontStyle: {
    fontFamily: "Montserrat, sans-serif",
    marginLeft: "8px",
  },
  iconStyle: {
    background: "linear-gradient(45deg, #ED1C24, #FF5733)",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
    color: "white",
    borderRadius: 45,
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  flexContainer: {
    display: "flex",
    alignItems: "center",
  },
};

const convertISOTimeStamp = (isoTimeStamp) => {
  const date = new Date(isoTimeStamp);
  return `${date.getUTCDate() || "--"}/${date.getUTCMonth() + 1 || "--"}/${
    date.getUTCFullYear() || "----"
  }`;
};

const BasicDetailsDisplay = ({
  FIRST_NAME,
  LAST_NAME,
  DATE_OF_BIRTH,
  GENDER,
}) => {
  return (
    <Box style={styles.boxStyle}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h5"
            style={{ ...styles.fontStyle, fontWeight: "bold" }}
          >
            {`${FIRST_NAME} ${LAST_NAME}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box style={styles.flexContainer}>
            <Box style={styles.iconStyle}>
              <CakeRoundedIcon />
            </Box>
            <Typography style={styles.fontStyle}>
              {convertISOTimeStamp(DATE_OF_BIRTH)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box style={styles.flexContainer}>
            <Box style={styles.iconStyle}>
              {GENDER === "Male" ? (
                <ManRoundedIcon />
              ) : GENDER === "Female" ? (
                <WomanRoundedIcon />
              ) : (
                <HelpOutlineRoundedIcon />
              )}
            </Box>
            <Typography style={styles.fontStyle}>{GENDER}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BasicDetailsDisplay;
