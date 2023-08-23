/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Container,
  Fade,
  Grid,
  Modal,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAxiosInstance from "../../hooks/useAxiosInstance";

import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import "@fontsource/montserrat";

const styles = {
  roundedPaper: {
    padding: 2,
    marginBottom: 1,
    borderRadius: 3,
  },
  section: {
    marginX: 50,
    marginBottom: 25,
    marginTop: 25,
  },
  sectionHeader: {
    textTransform: "none",
    color: "#ED1C24",
    marginBottom: 10,
    fontFamily: "Montserrat, sans-serif",
  },
  paragraph: {
    paddingY: 100,
    fontSize: "1.2em",
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
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 1.5,
    paddingRight: 1.5,
    borderRadius: 5,
  },
  textStyle: {
    textTransform: "none",
    color: "#2F9931",
    fontFamily: "Montserrat, sans-serif",
  },
  copyBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "lightgrey",
    padding: "10px",
    borderRadius: 1,
    width: "fit-content",
    cursor: "pointer",
    color: "grey",
    fontFamily: "Montserrat, sans-serif",
    fontSize: 15
  },
  copyIcon: {
    fontSize: "24px",
    marginRight: "5px",
    color: "grey",
  },
};

const JobDescription = (props) => {
  const [description, setDescription] = useState(null);
  const [activeStatus, setActiveStatus] = useState(null);
  const [jobId, setJobId] = useState(null);

  const [toolTipMessage, setTooltipMessage] = useState("Click to copy");

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const handleSuccessModalOpen = () => setSuccessModalOpen(true);
  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    navigate("/jobpostings");
  }

  const isAuthenticated = useSelector(
    (state) => state.userAuth.isAuthenticated
  );

  const navigate = useNavigate();
  const instance = useAxiosInstance();

  useEffect(() => {
    setDescription(props.description);
    setActiveStatus(props.activeStatus);
    setJobId(props.jobId);
  }, [props]);

  const generateSection = (sectionDetails) => {
    const sectionName = sectionDetails.SECTION_NAME;
    switch (sectionName.trim().toUpperCase()) {
      default:
        return (
          <Grid
            item
            xs={12}
            alignItems="left"
            key={sectionName}
            style={styles.section}
          >
            <Typography
              variant="h4"
              component="h4"
              style={styles.sectionHeader}
            >
              {sectionName}
            </Typography>
            <Typography variant="paragraph" style={styles.paragraph}>
              {sectionDetails?.CONTENT}
            </Typography>
          </Grid>
        );
    }
  };

  const hadndlePublish = async () => {
    try {
      const res = await instance.post("/jobs/toggleactivestatus", {
        JOB_ID: jobId,
        ACTIVE_STATUS: true,
      });
      handleSuccessModalOpen();
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleCopyOnClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setTooltipMessage('Copied!');
  }

  const handleCopyBoxMouseEnter = () => {
    if (toolTipMessage === 'Copied!') {
      setTooltipMessage('Copy to Clipboard');
    }
  }

  return (
    <Container>
      <Paper elevation={3} sx={styles.roundedPaper}>
        <Grid container spacing={2}>
          {description &&
            Object.values(description).map((section) =>
              generateSection(section)
            )}
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            {isAuthenticated ? (
              <>
                {activeStatus ? (
                  <>
                    <Button
                      variant="contained"
                      style={styles.shareButton}
                      endIcon={<ShareRoundedIcon />}
                      onClick={() => navigate(-1)}
                    >
                      {"Share"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      style={styles.shareButton}
                      onClick={() => navigate(-1)}
                    >
                      {"Go Back"}
                    </Button>
                    <Button
                      variant="contained"
                      style={styles.applyButton}
                      onClick={() => hadndlePublish()}
                    >
                      {"Publish"}
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  style={styles.shareButton}
                  endIcon={<ShareRoundedIcon />}
                  onClick={() => navigate(-1)}
                >
                  {"Share"}
                </Button>
                <Button
                  variant="contained"
                  style={styles.applyButton}
                  disabled={!activeStatus}
                  onClick={() => navigate("/jobform")}
                >
                  {"Apply"}
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
      <Modal
        open={successModalOpen}
        onClose={handleSuccessModalClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={successModalOpen}>
          <Box
            sx={{
              ...styles.modalStyle,
              height: window.innerWidth <= 900 ? "10vh" : "15vh",
              width: window.innerWidth <= 900 ? "80vw" : "35vw",
            }}
          >
            <Box style={{ height: "100%" }}>
              <Grid container rowSpacing={2}>
                <Grid item xs={12} container justifyContent="center">
                  <Typography sx={styles.textStyle}>
                    {"Your job posting has been published."}
                  </Typography>
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                <Tooltip title={toolTipMessage} arrow>
                <Box sx={styles.copyBox} onMouseEnter={handleCopyBoxMouseEnter} onClick={() => handleCopyOnClick()}>
                    <ContentCopyRoundedIcon sx={styles.copyIcon} />
                    {`${window.location.href}`}
                  </Box>
                </Tooltip>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default JobDescription;
