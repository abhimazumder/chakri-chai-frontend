/* eslint-disable no-unused-vars */
import { Container, Paper } from "@mui/material";
import React from "react";

const JobDesciption = () => {
  const styles = {
    roundedPaper: {
      padding: 2,
      marginBottom: 1,
      borderRadius: 3,
    },
    buttonBox: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 40,
      marginRight: 10,
      marginBottom: 20,
    },
    submitButton: {
      backgroundColor: "#ED1C24",
      textTransform: "none",
      paddingX: 20,
      borderRadius: 50,
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
    },
  };

  return (
    <Container>
      <Paper elevation={3} sx={styles.roundedPaper}></Paper>
    </Container>
  );
};

export default JobDesciption;
