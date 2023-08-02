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
import { useNavigate } from "react-router-dom";
import { SampleJob } from "../../templates/SampleJob";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import "@fontsource/montserrat";

const JobDescription = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);

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

  useEffect(() => {
    setJobData(SampleJob);
  }, []);

  const generateSection = (sectionDetails) => {
    const sectionName = sectionDetails.SECTION_NAME;
    switch (sectionName.trim().toUpperCase()) {
      // case "SKILLS":
      //   return (
      //     <Grid
      //       item
      //       xs={12}
      //       alignItems="left"
      //       key={sectionName}
      //       style={styles.section}
      //     >
      //       <Typography
      //         variant="h4"
      //         component="h4"
      //         style={styles.sectionHeader}
      //       >
      //         {sectionName}
      //       </Typography>
      //       <Grid
      //         container
      //         alignItems="left"
      //         spacing={1}
      //         style={{ paddingTop: 7 }}
      //       >
      //         {sectionDetails?.CONTENT?.map((skill, index) => {
      //           return (
      //             <Grid item xs={"auto"} key={index}>
      //               <Chip size="medium" label={skill} />
      //             </Grid>
      //           );
      //         })}
      //       </Grid>
      //     </Grid>
      //   );

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
          {jobData &&
            Object.values(jobData?.DESCRIPTION).map((section) =>
              generateSection(section)
            )}
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              style={styles.shareButton}
              type="submit"
              endIcon={<ShareRoundedIcon />}
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

export default JobDescription;
