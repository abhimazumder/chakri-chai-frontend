/* eslint-disable no-unused-vars */
import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import TitleCard from "./TitleCard";
import MiniJobPostings from "./MiniJobPostings";
import MiniJobApplications from "./MiniJobApplications";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { useSelector } from "react-redux";
import CryptoJS from "crypto-js";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const AdminConsoleIndex = () => {
  const instance = useAxiosInstance();
  const emailID = useSelector((state) => state.userAuth.user.EMAIL_ID);
  const [consoleContent, setConsoleContent] = useState(null);

  const [loader, setLoader] = useState(true);
  const handleLoaderOpen = () => setLoader(true);
  const handleLoaderClose = () => setLoader(false);

  useEffect(() => {
    const setupConsole = async (emailID) => {
      try{
        handleLoaderOpen();
        const encryptedEmailID = CryptoJS.AES.encrypt(
          emailID,
          import.meta.env.VITE_CRYPTO_SECRET_KEY
        ).toString();
        const res = await instance.post("/user/dashboardcontent", {
          EMAIL_ID: encryptedEmailID,
        });
        setConsoleContent(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error.response.message)
      } finally {
        handleLoaderClose();
      }
    };

    setupConsole(emailID);
  }, [emailID, instance]);
  return (
    <Container>
      <TitleCard />
      <Box sx={{ marginTop: 2 }}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <MiniJobPostings rows={consoleContent?.RECENT_JOB_POSTINGS ? consoleContent?.RECENT_JOB_POSTINGS : {}}/>
          </Grid>
          <Grid item md={6} xs={12}>
            <MiniJobApplications rows={consoleContent?.RECENT_JOB_APPLICATIONS ? consoleContent?.RECENT_JOB_APPLICATIONS : {}} />
          </Grid>
        </Grid>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default AdminConsoleIndex;
