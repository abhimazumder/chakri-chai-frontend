/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import "@fontsource/montserrat";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

const styles = {
  boxStyle: {
    borderRadius: 10,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, .5)",
    padding: "10px",
    maxWidth: "100%",
    minHeight: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  fontStyle: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "16px",
  },
  addressIcon: {
    background: "linear-gradient(45deg, #ED1C24, #FF5733)",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
    color: "white",
    borderRadius: 45,
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const AddressDisplay = ({ ADDRESS }) => {
  return (
    <Box style={styles.boxStyle}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={2}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Box style={styles.addressIcon}>
            <HomeRoundedIcon />
          </Box>
        </Grid>
        <Grid item xs={"auto"} sm={"auto"} container>
          <Grid item xs={12}>
            <Typography variant="body2" style={styles.fontStyle}>
              {`${ADDRESS["Street Address"]},`}
            </Typography>
            <Typography variant="body2" style={styles.fontStyle}>
              {`${ADDRESS["City/Town"]}, ${ADDRESS["State/Province"]}, ${ADDRESS["Country"]}`}
            </Typography>
            <Typography variant="body2" style={styles.fontStyle}>
              {`Pincode - ${ADDRESS["Pincode"]}`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddressDisplay;
