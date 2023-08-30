/* eslint-disable no-unused-vars */
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useReducer, useState } from "react";
import { Box, Switch, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import useAxiosInstance from "../../hooks/useAxiosInstance";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const convertISOTimeStamp = (isoTimeStamp) => {
  const date = new Date(isoTimeStamp);
  return `${date.getUTCDate() || "--"}/${date.getUTCMonth() + 1 || "--"}/${
    date.getUTCFullYear() || "----"
  }`;
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case "SET_JOB_POSTINGS":
      return action.payload;

    case "TOGGLE_STATUS_ACTIVE": {
      const activeStatus = action.payload.activeStatus;
      const jobId = action.payload.jobId;
      return state.map((item) =>
        item.JOB_ID === jobId ? { ...item, ACTIVE_STATUS: activeStatus } : item
      );
    }

    default:
      return state;
  }
};

const JobTable = () => {
  const [data, dispatchData] = useReducer(dataReducer, []);
  const userId = useSelector((state) => state.userAuth?.user?.USER_ID);
  const [render, setRender] = useState(true);

  const [loader, setLoader] = useState(true);
  const handleLoaderOpen = () => setLoader(true);
  const handleLoaderClose = () => setLoader(false);

  const instance = useAxiosInstance();
  const navigate = useNavigate();

  useEffect(() => {
    const getJobPostings = async () => {
      try {
        handleLoaderOpen();
        const res = await instance.post("/jobs/jobpostings", {
          USER_ID: userId,
        });
        dispatchData({
          type: "SET_JOB_POSTINGS",
          payload: res.data.Items,
        });
      } catch (error) {
        console.error(error.response.data);
      } finally {
        handleLoaderClose();
      }
    };
    getJobPostings();
  }, [instance, userId, render]);

  const handleActiveStatusChange = async (event, jobId) => {
    try {
      dispatchData({
        type: "TOGGLE_STATUS_ACTIVE",
        payload: {
          jobId,
          activeStatus: event.target.checked,
        },
      });
      const res = await instance.post("/jobs/toggleactivestatus", {
        JOB_ID: jobId,
        ACTIVE_STATUS: event.target.checked,
      });
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleDeleteJob = async (JOB_ID) => {
    try {
      const res = await instance.post("/jobs/deletejob", { JOB_ID });
      setRender(!render);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const columns = [
    {
      field: "JOB_ID",
      headerName: "Job ID",
      width: 120,
    },
    {
      field: "JOB_TITLE",
      headerName: "Job Title",
      width: 240,
    },
    {
      field: "POSTING_DATE",
      headerName: "Posting Date",
      width: 120,
      valueGetter: (params) => {
        return convertISOTimeStamp(params.row.POSTING_DATE);
      },
    },
    {
      field: "APPLICATION_DEADLINE",
      headerName: "Application Deadline",
      width: 120,
      valueGetter: (params) => {
        return convertISOTimeStamp(params.row.APPLICATION_DEADLINE);
      },
    },
    {
      field: "TOTAL_APPLICATIONS",
      headerName: "Total Applications",
      width: 120,
    },
    {
      field: "ACTIVE_STATUS",
      headerName: "Active Status",
      width: 120,
      renderCell: (params) => (
        <Switch
          checked={params.row.ACTIVE_STATUS}
          onChange={(event) =>
            handleActiveStatusChange(event, params.row.JOB_ID)
          }
        />
      ),
      sortable: false,
    },
    {
      field: "ACTIONS",
      headerName: "Actions",
      width: 220,
      renderCell: (params) => (
        <>
          <Box marginRight={4}>
            <Tooltip title={"Edit"} arrow>
              <EditRoundedIcon
                onClick={() => {
                  // Handle edit logic here
                }}
                style={{ cursor: "pointer" }}
              />
            </Tooltip>
          </Box>
          <Box marginRight={4}>
            <Tooltip title={"Delete"} arrow>
              <DeleteRoundedIcon
                onClick={() => handleDeleteJob(params.row.JOB_ID)}
                style={{ cursor: "pointer" }}
              />
            </Tooltip>
          </Box>
          <Box marginRight={4}>
            <Tooltip title={"View"} arrow>
              <ArrowForwardRoundedIcon
                onClick={() => {
                  navigate(`/jobinfo?jobid=${params.row.JOB_ID}`);
                }}
                style={{ cursor: "pointer" }}
              />
            </Tooltip>
          </Box>
          <Box marginRight={0}>
            <Tooltip title={"Click to copy"} arrow>
              <ContentCopyRoundedIcon
                onClick={() => {
                  const rootDomain =
                    window.location.href.match(/^https?:\/\/[^/]+/)?.[0] || "";
                  navigator.clipboard.writeText(
                    `${rootDomain}/jobinfo?jobid=${params.row.JOB_ID}`
                  );
                }}
                style={{ cursor: "pointer" }}
              />
            </Tooltip>
          </Box>
        </>
      ),
      sortable: false,
    },
  ];

  return (
    <>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.JOB_ID}
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

export default JobTable;
