/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
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
};

const JobDescription = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [description, setDescription] = useState(null);
  const [activeStatus, setActiveStatus] = useState(null);
  const [adminView, setAdminView] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setAdminView(searchParams.get("adminview") === "true" ? true : false);
    setDescription(props.description);
    setActiveStatus(props.activeStatus);
  }, [props, location.search]);

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

  return (
    <Container>
      <Paper elevation={3} sx={styles.roundedPaper}>
        <Grid container spacing={2}>
          {description &&
            Object.values(description).map((section) =>
              generateSection(section)
            )}
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            {adminView ? (
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
                      onClick={() => navigate("/jobform")}
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
                  onClick={() => navigate("/jobform")}
                >
                  {"Apply"}
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default JobDescription;
