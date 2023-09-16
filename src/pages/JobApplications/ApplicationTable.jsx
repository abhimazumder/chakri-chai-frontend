/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Backdrop, Box, CircularProgress, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import CryptoJS from "crypto-js";

import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { useNavigate } from "react-router-dom";

const convertISOTimeStamp = (isoTimeStamp) => {
  const date = new Date(isoTimeStamp);
  return `${date.getUTCDate() || "--"}/${date.getUTCMonth() + 1 || "--"}/${
    date.getUTCFullYear() || "----"
  }`;
};

const ApplicationTable = ({ applicationsData }) => {
  const [loader, setLoader] = useState(false);
  const handleLoaderOpen = () => setLoader(true);
  const handleLoaderClose = () => setLoader(false);

  const instance = useAxiosInstance();
  const navigate = useNavigate();

  const downloadResume = async (objKey) => {
    try {
      handleLoaderOpen();
      const encryptedObjKey = CryptoJS.AES.encrypt(
        objKey,
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

  const columns = [
    {
      field: "APPLICATION_ID",
      headerName: "Application ID",
      width: 120,
    },
    {
      field: "APPLICANT_NAME",
      headerName: "Applicant Name",
      width: 170,
      valueGetter: (params) => {
        return `${params.row.FIRST_NAME} ${params.row.LAST_NAME}`;
      },
    },
    {
      field: "JOB_TITLE",
      headerName: "Job Title",
      width: 240,
    },
    {
      field: "APPLIED_ON",
      headerName: "Applied On",
      width: 100,
      valueGetter: (params) => {
        return convertISOTimeStamp(params.row.APPLIED_ON);
      },
    },
    {
      field: "EMAIL_ID",
      headerName: "Email ID",
      width: 200,
    },
    {
      field: "PHONE_NUMBER",
      headerName: "Phone Number",
      width: 120,
    },
    {
      field: "ACTIONS",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <>
          <Box marginRight={4}>
            <Tooltip title={`Download ${params.row.FIRST_NAME}'s resume`} arrow>
              <SimCardDownloadOutlinedIcon
                onClick={() => downloadResume(params.row.RESUME)}
                style={{ cursor: "pointer" }}
              />
            </Tooltip>
          </Box>
          <Box>
            <Tooltip
              title={`View ${params.row.FIRST_NAME}'s application`}
              arrow
            >
              <ArrowForwardRoundedIcon
                onClick={() => {
                  navigate(`/applicationinfo?jobid=${params.row.JOB_ID}&applicationid=${params.row.APPLICATION_ID}`);
                }}
                style={{ cursor: "pointer" }}
              />
            </Tooltip>
          </Box>
        </>
      ),
    },
  ];
  return (
    <>
      <DataGrid
        rows={applicationsData}
        columns={columns}
        getRowId={(row) => row.APPLICATION_ID}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ApplicationTable;
