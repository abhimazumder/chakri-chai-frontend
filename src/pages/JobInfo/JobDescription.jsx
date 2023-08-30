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
import Divider from "@mui/material/Divider";

import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
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
    padding: "10px",
    border: "1px solid grey",
    borderRadius: 1,
    width: "fit-content",
    cursor: "pointer",
  },
  linkIcon: {
    fontSize: "24px",
    marginRight: "5px",
    color: "grey",
  },
  doneIcon: {
    color: "#2F9931",
    fontSize: "40px",
  },
  linkTextStyle: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 15,
    marginLeft: 5,
  },
  linkedinStyle: {
    color: "#0A66C2",
    fontSize: "30px",
    cursor: "pointer",
  },
  whatsappStyle: {
    color: "#25D366",
    fontSize: "30px",
    cursor: "pointer",
  },
  facebookStyle: {
    color: "#1877F2",
    fontSize: "30px",
    cursor: "pointer",
  },
  twitterIcon: {
    color: "#00acee",
    fontSize: "30px",
    cursor: "pointer",
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
  };

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const handleShareModalOpen = () => setShareModalOpen(true);
  const handleShareModalClose = () => setShareModalOpen(false);

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

  const handlePublish = async () => {
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
    setTooltipMessage("Copied!");
  };

  const handleCopyBoxMouseEnter = () => {
    if (toolTipMessage === "Copied!") {
      setTooltipMessage("Copy to Clipboard");
    }
  };

  const handleShareClick = (platform) => {
    const url = window.location.href;
    const message = `Hey, checkout this job on Chakri Chai\n${url}`;

    switch (platform) {
      case "linkedin":
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            url
          )}&title=${encodeURIComponent(message)}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            message
          )}`,
          "_blank"
        );
        break;
      default:
        break;
    }
  };

  const shareOptions = (
    <>
      <Grid item xs={12} container justifyContent="center" alignItems="center">
        <Grid item xs={3} container justifyContent="center">
          <Typography style={{ ...styles.linkTextStyle, fontWeight: "bold" }}>
            {"Share it on:"}
          </Typography>
        </Grid>
        <Grid item xs={2.25} container justifyContent="center">
          <LinkedInIcon
            sx={styles.linkedinStyle}
            onClick={() => handleShareClick("linkedin")}
          />
        </Grid>
        <Grid item xs={2.25} container justifyContent="center">
          <WhatsAppIcon
            sx={styles.whatsappStyle}
            onClick={() => handleShareClick("whatsapp")}
          />
        </Grid>
        <Grid item xs={2.25} container justifyContent="center">
          <FacebookIcon
            sx={styles.facebookStyle}
            onClick={() => handleShareClick("facebook")}
          />
        </Grid>
        <Grid item xs={2.25} container justifyContent="center">
          <TwitterIcon
            sx={styles.twitterIcon}
            onClick={() => handleShareClick("twitter")}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        <Tooltip title={toolTipMessage} arrow>
          <Box
            sx={styles.copyBox}
            onMouseEnter={handleCopyBoxMouseEnter}
            onClick={() => handleCopyOnClick()}
          >
            <LinkRoundedIcon sx={styles.linkIcon} />
            <Divider orientation="vertical" flexItem />
            <Typography style={styles.linkTextStyle}>
              {`${window.location.href}`}
            </Typography>
          </Box>
        </Tooltip>
      </Grid>
    </>
  );

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
                      onClick={() => handleShareModalOpen()}
                    >
                      {"Share"}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      style={styles.shareButton}
                      onClick={() => handleShareModalOpen()}
                    >
                      {"Go Back"}
                    </Button>
                    <Button
                      variant="contained"
                      style={styles.applyButton}
                      onClick={() => handlePublish()}
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
                  onClick={() => handleShareModalOpen()}
                >
                  {"Share"}
                </Button>
                <Button
                  variant="contained"
                  style={styles.applyButton}
                  disabled={!activeStatus}
                  onClick={() => navigate(`/jobform?jobid=${props.jobId}`)}
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
              height: window.innerWidth <= 900 ? "30vh" : "30vh",
              width: window.innerWidth <= 900 ? "80vw" : "35vw",
            }}
          >
            <Box style={{ height: "100%" }}>
              <Grid container rowSpacing={3}>
                <Grid
                  item
                  xs={12}
                  container
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                >
                  <Box position="relative">
                    <CheckCircleOutlineRoundedIcon sx={styles.doneIcon} />
                    <Typography sx={styles.textStyle}>
                      {"Your job posting has been published."}
                    </Typography>
                  </Box>
                </Grid>
                {shareOptions}
              </Grid>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <Modal
        open={shareModalOpen}
        onClose={handleShareModalClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={shareModalOpen}>
          <Box
            sx={{
              ...styles.modalStyle,
              height: window.innerWidth <= 900 ? "15vh" : "15vh",
              width: window.innerWidth <= 900 ? "80vw" : "35vw",
            }}
          >
            <Box style={{ height: "100%" }}>
              <Grid container rowSpacing={3}>
                {shareOptions}
              </Grid>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default JobDescription;
