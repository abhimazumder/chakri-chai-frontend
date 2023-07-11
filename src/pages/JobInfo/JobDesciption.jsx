/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import {
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SampleJob } from "../../templates/SampleJob";
import "@fontsource/montserrat";
import { useNavigate } from "react-router-dom";

const JobDesciption = () => {
  const styles = {
    roundedPaper: {
      paddingY: 2,
      paddingX: 5,
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
      backgroundColor: "#ED1C24",
      borderRadius: 50,
      width: 150,
      height: 50,
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
      margin: 3
    },
    shareButton: {
      backgroundColor: "#2F4F4F",
      borderRadius: 50,
      width: 150,
      height: 50,
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
      margin: 3
    },
  };

  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    setJobData(SampleJob);
  }, []);

  const generateSection = (sections, sectionName) => {
    const content = sections[sectionName];
    switch (sectionName.trim().toUpperCase()) {
      case "SKILLS":
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
            <Grid
              container
              alignItems="left"
              spacing={1}
              style={{ paddingTop: 7 }}
            >
              {content.map((skill, index) => {
                return (
                  <Grid item xs={"auto"} key={index}>
                    <Chip size="medium" label={skill} />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        );

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
              {content}
            </Typography>
          </Grid>
        );
    }
  };

  return (
    <Container>
      <Paper elevation={3} sx={styles.roundedPaper}>
          <Grid container spacing={2}>
            {jobData &&
              Object.keys(jobData?.SECTIONS).map((sectionName) =>
                generateSection(jobData?.SECTIONS, sectionName)
              )}
            <Grid
              item
              xs={12}
              container
              justifyContent="flex-end"
              alignItems="flex-end"
              style={{marginBottom: 25}}
            >
              <Button
                variant="contained"
                style={styles.shareButton}
                type="submit"
                // onClick={() => navigate()}
              >
                {"Share"}
              </Button>
              <Button
                variant="contained"
                style={styles.applyButton}
                type="submit"
                onClick={() => navigate("/jobform")}
              >
                {"Apply"}
              </Button>
            </Grid>
          </Grid>
      </Paper>
    </Container>
  );
};

export default JobDesciption;
