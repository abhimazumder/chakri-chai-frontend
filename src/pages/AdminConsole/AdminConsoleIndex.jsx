/* eslint-disable no-unused-vars */
import { Box, Container, Grid } from "@mui/material";
import React from "react";
import TitleCard from "./TitleCard";
import MiniJobPostings from "./MiniJobPostings";
import MiniJobApplications from "./MiniJobApplications";

const AdminConsoleIndex = () => {
  return (
    <Container>
      <TitleCard />
      <Box sx={{ marginTop: 2 }}>
        <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
                <MiniJobPostings/>
            </Grid>
            <Grid item md={6} xs={12}>
                <MiniJobApplications/>
            </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminConsoleIndex;
