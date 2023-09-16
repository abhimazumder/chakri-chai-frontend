/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Grid, Link } from "@mui/material";

import PermContactCalendarRoundedIcon from "@mui/icons-material/PermContactCalendarRounded";

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
    fontSize: "16px",
  },
  contactIcon: {
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

const ContactDetailsDisplay = ({ EMAIL_ID, PHONE_NUMBER }) => {
  const handleEmailClick = () => {
    window.location.href = `mailto:${EMAIL_ID}`;
  };

  const handlePhoneNumberClick = () => {
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  return (
    <Box style={styles.boxStyle}>
      <Grid container spacing={2}>
        <Grid item xs={2} container justifyContent="center" alignItems="center">
          <Box style={styles.contactIcon}>
            <PermContactCalendarRoundedIcon />
          </Box>
        </Grid>
        <Grid item xs={10} container rowSpacing={1}>
          <Grid item xs={12}>
            <Link
              component="button"
              variant="body2"
              underline="hover"
              color="#ED1C24"
              style={styles.fontStyle}
              onClick={handleEmailClick}
            >
              {EMAIL_ID}
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Link
              component="button"
              variant="body2"
              underline="hover"
              color="#ED1C24"
              style={styles.fontStyle}
              onClick={handlePhoneNumberClick}
            >
              {PHONE_NUMBER}
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactDetailsDisplay;
