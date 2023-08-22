/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import "@fontsource/montserrat";
import { LoadingButton } from "@mui/lab";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useDispatch } from "react-redux";
import {setUserLogout} from "../services/userAuthSlice";
import { useNavigate } from "react-router-dom";

const styles = {
  textStyle: {
    textTransform: "none",
    color: "#ED1C24",
    fontFamily: "Montserrat, sans-serif",
  },
  logoutButton: {
    textTransform: "none",
    background: "linear-gradient(45deg, #ED1C24, #FF5733)",
    borderRadius: 35,
    fontSize: "1rem",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
    fontFamily: "Montserrat, sans-serif",
    color: "#FFFFFF",
    marginLeft: 5,
    marginRight: 5,
    height: "50px",
    width: "45%",
  },
  cancelButton: {
    textTransform: "none",
    background: "linear-gradient(45deg, #242424, #888888)",
    borderRadius: 35,
    fontSize: "1rem",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
    fontFamily: "Montserrat, sans-serif",
    color: "#FFFFFF",
    marginLeft: 5,
    marginRight: 5,
    height: "50px",
    width: "45%",
  },
};

const Logout = ({ handleModalOpen, handleModalClose }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoading(true);
        dispatch(setUserLogout());
        setLoading(false);
        handleModalClose();
        navigate("/");
    }
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} container justifyContent="center">
        <Typography sx={styles.textStyle}>
          {"Are you sure you want to log out?"}
        </Typography>
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        <Button style={styles.cancelButton} onClick={handleModalClose}>{"Cancel"}</Button>
        <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={<LogoutRoundedIcon />}
            type="submit"
            variant="contained"
            style={styles.logoutButton}
            onClick={() => handleLogout()}
          >
            {"Log out"}
          </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default Logout;
