/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkIcon from "@mui/icons-material/Link";
import "@fontsource/montserrat";
import { Link, useNavigate } from "react-router-dom";

const JobCard = ({ jobData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const styles = {
    roundedPaper: {
      padding: 20,
      borderRadius: 6,
    },
    gridItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    jobTitle: {
      textTransform: "none",
      color: "#ED1C24",
      marginBottom: 10,
      fontFamily: "Montserrat, sans-serif",
    },
    fontStyle: {
      fontFamily: "Montserrat, sans-serif",
    },
    applyButton: {
      textTransform: "none",
      backgroundColor: "#ED1C24",
      background: "linear-gradient(45deg, #ED1C24, #FF5733)",
      borderRadius: 50,
      width: 120,
      height: 40,
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
      margin: 3,
      fontFamily: "Montserrat, sans-serif",
    },
    shareButton: {
      textTransform: "none",
      backgroundColor: "#242424",
      background: "linear-gradient(45deg, #242424, #888888)",
      borderRadius: 50,
      width: 120,
      height: 40,
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
      margin: 3,
      fontFamily: "Montserrat, sans-serif",
    },
    modalStyle: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      position: "absolute",
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 6,
      minHeight: "200px",
      minWidth: "300px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    iconWrapper: {
      display: "flex",
      justifyContent: "space-evenly",
      color: "grey",
    },
    icon: {
      fontSize: "48px",
    },
  };

  const {
    JOB_ID,
    JOB_TITLE,
    JOB_LOCATIONS,
    POSTING_DATE,
    APPLICATION_DEADLINE,
    REQUIRED_EXPERIENCE,
  } = jobData;

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <Paper elevation={3} style={styles.roundedPaper}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4}>
          <Typography variant="h5" component="h5" style={styles.jobTitle}>
            {JOB_TITLE}
          </Typography>
          <Typography
            variant="body2"
            fontWeight="fontWeightBold"
            color="textSecondary"
          >
            {`Job ID: ${JOB_ID}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Typography
            variant="body2"
            fontWeight="fontWeightBold"
            color="textSecondary"
          >
            {"Location: "}
          </Typography>
          <Typography
            variant="h6"
            fontWeight="fontWeightBold"
            style={styles.fontStyle}
          >
            {Object.keys(JOB_LOCATIONS).length > 1
              ? "Multiple"
              : JOB_LOCATIONS[Object.keys(JOB_LOCATIONS)[0]].length > 1
              ? "Multiple"
              : JOB_LOCATIONS[Object.keys(JOB_LOCATIONS)[0]][0]}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Typography
            variant="body2"
            fontWeight="fontWeightBold"
            color="textSecondary"
          >
            {"Posting Date: "}
          </Typography>
          <Typography
            variant="h6"
            fontWeight="fontWeightBold"
            style={styles.fontStyle}
          >
            {POSTING_DATE}
          </Typography>
          <Typography
            variant="body2"
            fontWeight="fontWeightBold"
            color="textSecondary"
          >
            {"Application Deadline: "}
          </Typography>
          <Typography
            variant="h6"
            fontWeight="fontWeightBold"
            style={styles.fontStyle}
          >
            {APPLICATION_DEADLINE}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Typography
            variant="body2"
            fontWeight="fontWeightBold"
            color="textSecondary"
          >
            {"Required Experience: "}
          </Typography>
          <Typography
            variant="h6"
            fontWeight="fontWeightBold"
            style={styles.fontStyle}
          >
            {Object.keys(REQUIRED_EXPERIENCE?.RANGE).length === 2
              ? `${REQUIRED_EXPERIENCE?.RANGE?.MINIMUM} - ${REQUIRED_EXPERIENCE?.RANGE?.MAXIMUM} ${REQUIRED_EXPERIENCE.UNIT}`
              : REQUIRED_EXPERIENCE?.RANGE?.MINIMUM
              ? `> ${REQUIRED_EXPERIENCE?.RANGE?.MINIMUM} ${REQUIRED_EXPERIENCE.UNIT}`
              : REQUIRED_EXPERIENCE?.RANGE?.MAXIMUM
              ? `< ${REQUIRED_EXPERIENCE?.RANGE?.MAXIMUM} ${REQUIRED_EXPERIENCE.UNIT}`
              : REQUIRED_EXPERIENCE?.RANGE?.ABSOLUTE
              ? `${REQUIRED_EXPERIENCE?.RANGE?.ABSOLUTE} ${REQUIRED_EXPERIENCE.UNIT}`
              : ""}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={2} style={styles.gridItem}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                style={styles.shareButton}
                type="submit"
                endIcon={<ShareRoundedIcon />}
                onClick={handleModalOpen}
              >
                {"Share"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                style={styles.applyButton}
                type="submit"
                onClick={() => navigate("/jobinfo")}
              >
                {"Apply"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box style={styles.modalStyle}>
          <Box style={styles.iconWrapper}>
            <WhatsAppIcon style={styles.icon} />
            <FacebookIcon style={styles.icon} />
            <LinkedInIcon style={styles.icon} />
            <InstagramIcon style={styles.icon} />
            <LinkIcon style={styles.icon} />
          </Box>
        </Box>
      </Modal>
    </Paper>
  );
};

export default JobCard;
