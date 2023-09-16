/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Autocomplete,
  TextField,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import CryptoJS from "crypto-js";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import ApplicationTable from "./ApplicationTable";

const styles = {
  roundedPaper: {
    padding: 20,
    marginBottom: 1,
    borderRadius: 8,
    overflowX: "auto",
  },
  backIconStyle: {
    color: "grey",
    fontSize: "2.5rem",
    cursor: "pointer",
  },
  buttonStyle: {
    textTransform: "none",
    backgroundColor: "#ED1C24",
    background: "linear-gradient(45deg, #ED1C24, #FF5733)",
    borderRadius: 50,
    width: 180,
    height: 40,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
    fontFamily: "Montserrat, sans-serif",
  },
};

const JobApplicationsIndex = () => {
  const [jobTitleList, setJobTitleList] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [applicationsData, setApplicationsData] = useState([]);

  const [loader, setLoader] = useState(true);
  const handleLoaderOpen = () => setLoader(true);
  const handleLoaderClose = () => setLoader(false);

  const navigate = useNavigate();
  const userId = useSelector((state) => state.userAuth.user.USER_ID);
  const instance = useAxiosInstance();

  useEffect(() => {
    const getJobTitles = async () => {
      try {
        handleLoaderOpen();
        const encryptedUserID = CryptoJS.AES.encrypt(
          userId,
          import.meta.env.VITE_CRYPTO_SECRET_KEY
        ).toString();
        const res = await instance.post("/user/getjobtitles", {
          USER_ID: encryptedUserID,
        });
        setJobTitleList(res.data.Items);
      } catch (error) {
        console.error(error.response.data);
      } finally {
        handleLoaderClose();
      }
    };
    getJobTitles();
  }, [userId, instance]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        handleLoaderOpen();
        const jobIDs = selectedJobs.map(job => job.ID);
        const encryptedUserID = CryptoJS.AES.encrypt(
          userId,
          import.meta.env.VITE_CRYPTO_SECRET_KEY
        ).toString();
        const res = await instance.post("/user/getapplications", {
          USER_ID: encryptedUserID,
          JOB_IDS: jobIDs,
        });
        setApplicationsData(res.data.Items);
      } catch (error) {
        console.error(error.response.data);
      } finally {
        handleLoaderClose();
      }
    };
    fetchApplications();
  }, [userId, selectedJobs, instance]);

  const handleChange = (event, value) => {
    setSelectedJobs(value);
  };

  return (
    <Container>
      <Paper elevation={3} style={styles.roundedPaper}>
        <Grid container spacing={2}>
          <Grid item container xs={12} alignItems="center">
            <ArrowBackRoundedIcon
              style={styles.backIconStyle}
              onClick={() => navigate("/console")}
            />
            <Box style={{ marginLeft: "auto", width: "280px" }}>
              <Autocomplete
                multiple
                id="job-title-autocomplete"
                options={jobTitleList}
                value={selectedJobs}
                onChange={handleChange}
                getOptionLabel={(option) => option.VALUE}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Filter applications by Job"
                    fullWidth
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props}>{option.VALUE}</li>
                )}
                isOptionEqualToValue={(option, value) => option.ID === value.ID}
              />
            </Box>
          </Grid>
          <Grid item xs={12} style={{ minHeight: 200 }}>
            <ApplicationTable applicationsData={applicationsData}/>
          </Grid>
        </Grid>
      </Paper>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default JobApplicationsIndex;
