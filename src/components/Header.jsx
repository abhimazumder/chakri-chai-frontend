/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Fade,
  Box,
  Modal,
  Backdrop,
  Tab,
  Grid,
} from "@mui/material";
import "@fontsource/montserrat";
import Login from "./Login";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const headerStyles = {
  appBar: {
    backgroundColor: "black",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    padding: 5,
  },
  logo: {
    width: 40,
    marginRight: 10,
  },
  title: {
    flexGrow: 1,
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "bold",
  },
  loginButton: {
    marginRight: 10,
    borderRadius: 20,
    border: "2px solid white",
    textTransform: "none",
    background: "linear-gradient(45deg, #ED1C24, #FF5733)",
    fontFamily: "Montserrat, sans-serif",
    color: "#FFFFFF",
  },
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: window.innerWidth <= 900 ? "40vh" : "50vh",
    width: window.innerWidth <= 900 ? "80vw" : "30vw",
    bgcolor: "background.paper",
    boxShadow: 24,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 5,
  },
};

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const [tabValue, setTabValue] = useState("login");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <AppBar position="sticky" style={headerStyles.appBar}>
      <Toolbar>
        <img
          src="src/assets/header-logo.png"
          alt="Logo"
          style={headerStyles.logo}
        />
        <Typography variant="h6" style={headerStyles.title}>
          {"chakri chai"}
        </Typography>
        <Button
          variant="contained"
          style={headerStyles.loginButton}
          onClick={handleModalOpen}
        >
          {"Log in"}
        </Button>
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={modalOpen}>
            <Box sx={headerStyles.modalStyle}>
              <Box style={{ height: "100%" }}>
                <TabContext value={tabValue}>
                  <Box>
                    <TabList
                      onChange={handleTabChange}
                      centered
                      textColor="inherit"
                      TabIndicatorProps={{
                        style: {
                          backgroundColor: "#ED1C24",
                        },
                      }}
                    >
                      <Tab label="Log In" value="login" />
                      <Tab label="Sign Up" value="signup" />
                    </TabList>
                  </Box>
                  <TabPanel value="login">
                    <Login />
                  </TabPanel>
                  <TabPanel value="signup">Work for later!</TabPanel>
                </TabContext>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
