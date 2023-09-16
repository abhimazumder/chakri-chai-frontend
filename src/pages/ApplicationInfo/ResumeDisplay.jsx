/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Backdrop, Box, CircularProgress, Fab } from "@mui/material";
import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";
import "@fontsource/montserrat";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import CryptoJS from "crypto-js";

const ResumeDisplay = ({ RESUME }) => {
  const [loader, setLoader] = useState(false);
  const handleLoaderOpen = () => setLoader(true);
  const handleLoaderClose = () => setLoader(false);

  const instance = useAxiosInstance();

  const downloadResume = async () => {
    try {
      handleLoaderOpen();
      const encryptedObjKey = CryptoJS.AES.encrypt(
        RESUME,
        import.meta.env.VITE_CRYPTO_SECRET_KEY
      ).toString();

      const res = await instance.post("/user/getresume", {
        OBJ_KEY: encryptedObjKey,
      });

      const decryptedURL = CryptoJS.AES.decrypt(
        res.data.URL,
        import.meta.env.VITE_CRYPTO_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);

      window.open(decryptedURL);
    } catch (error) {
      console.error(error);
    } finally {
      handleLoaderClose();
    }
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <Fab
        variant="extended"
        style={{
          background: "linear-gradient(45deg, #ED1C24, #FF5733)",
          color: "white",
          textTransform: "none",
          fontFamily: "Montserrat, sans-serif",
        }}
        onClick={downloadResume}
      >
        <SimCardDownloadOutlinedIcon sx={{ mr: 1 }} />
        {"Resume"}
      </Fab>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default ResumeDisplay;
