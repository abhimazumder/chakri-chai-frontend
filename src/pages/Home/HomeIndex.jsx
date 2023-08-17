/* eslint-disable no-unused-vars */
import { Container, Paper } from "@mui/material";
import React from "react";

const styles = {
  roundedPaper: {
    padding: 2,
    marginBottom: 1,
    borderRadius: 3,
  },
};

const HomeIndex = () => {
  return (
    <Container>
      <Paper elevation={3} sx={styles.roundedPaper}>
        HomeIndex
      </Paper>
    </Container>
  );
};

export default HomeIndex;
