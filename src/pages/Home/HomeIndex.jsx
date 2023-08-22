/* eslint-disable no-unused-vars */
import { Container, Paper } from "@mui/material";
import React from "react";
import useRefresh from "../../hooks/useRefresh";

const styles = {
  roundedPaper: {
    padding: 2,
    marginBottom: 1,
    borderRadius: 3,
  },
};

const HomeIndex = () => {
  const refresh = useRefresh();
  return (
    <Container>
      <Paper elevation={3} sx={styles.roundedPaper}>
        HomeIndex
        <button 
        onClick={() => refresh()}
        >Ekhane Tepo!</button>
      </Paper>
    </Container>
  );
};

export default HomeIndex;
