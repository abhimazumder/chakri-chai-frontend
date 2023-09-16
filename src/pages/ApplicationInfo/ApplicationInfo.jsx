/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Container, Grid, Paper } from "@mui/material";
import React from "react";
import EducationExpereinceDisplay from "./EducationExpereinceDisplay";
import AddressDisplay from "./AddressDisplay";
import BasicDetailsDisplay from "./BasicDetailsDisplay";
import ContactDetailsDisplay from "./ContactDetailsDisplay";
import ResumeDisplay from "./ResumeDisplay";

const styles = {
  roundedPaper: {
    padding: 20,
    marginBottom: 1,
    borderRadius: 8,
    overflowX: "auto",
  },
};

const ApplicationInfo = ({ applicationData }) => {
  console.log(applicationData);
  return (
    <Container>
      <Paper elevation={3} style={styles.roundedPaper}>
        {applicationData && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <BasicDetailsDisplay
                FIRST_NAME={applicationData.FIRST_NAME}
                LAST_NAME={applicationData.LAST_NAME}
                DATE_OF_BIRTH={applicationData.DATE_OF_BIRTH}
                GENDER={applicationData.GENDER}
              />
            </Grid>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={12} sm={6}>
                <ContactDetailsDisplay
                  EMAIL_ID={applicationData.EMAIL_ID}
                  PHONE_NUMBER={applicationData.PHONE_NUMBER}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <AddressDisplay ADDRESS={applicationData.ADDRESS} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <EducationExpereinceDisplay
                EDUCATION={applicationData.EDUCATION}
                EXPEREINCE={applicationData.EXPEREINCE}
              />
            </Grid>
            <Grid item xs={12}>
              <ResumeDisplay RESUME={applicationData.RESUME} />
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default ApplicationInfo;
