/* eslint-disable no-unused-vars */
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useReducer, useState } from "react";
import { Switch, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import { format } from "date-fns";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { useNavigate } from "react-router-dom";

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
  console.log("Render");
  const [data, dispatchData] = useReducer(dataReducer, []);
  const userId = useSelector((state) => state.userAuth?.user?.USER_ID);

  const instance = useAxiosInstance();
  const navigate = useNavigate();

  useEffect(() => {
    const getJobPostings = async () => {
      try {
        const res = await instance.post("/jobs/jobpostings", {
          USER_ID: userId,
        });
        dispatchData({
          type: "SET_JOB_POSTINGS",
          payload: res.data.Items,
        });
      } catch (error) {
        console.error(error.response.data);
      }
    };
    getJobPostings();
  }, [instance, userId]);

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

  const columns = [
    {
      field: "JOB_ID",
      headerName: "Job ID",
      width: 110,
    },
    {
      field: "JOB_TITLE",
      headerName: "Job Title",
      width: 200,
    },
    {
      field: "POSTING_DATE",
      headerName: "Posting Date",
      width: 120,
      valueGetter: (params) => {
        const postingDate = new Date(params.row.POSTING_DATE);
        return format(postingDate, "yyyy-MM-dd");
      },
    },
    {
      field: "APPLICATION_DEADLINE",
      headerName: "Application Deadline",
      width: 120,
      valueGetter: (params) => {
        const deadlineDate = new Date(params.row.APPLICATION_DEADLINE);
        return format(deadlineDate, "yyyy-MM-dd");
      },
    },
    {
      field: "TOTAL_APPLICATIONS",
      headerName: "Total Applications",
      width: 110,
    },
    {
      field: "ACTIVE_STATUS",
      headerName: "Active Status",
      width: 120,
      renderCell: (params) => (
        <Switch
          checked={params.row.ACTIVE_STATUS}
          // Handle toggle logic here
          onChange={(event) =>
            handleActiveStatusChange(event, params.row.JOB_ID)
          }
        />
      ),
      sortable: false,
    },
    {
      field: "EDIT",
      headerName: "Edit",
      width: 70,
      renderCell: (params) => (
        <EditRoundedIcon
          onClick={() => {
            // Handle edit logic here
          }}
          style={{ cursor: "pointer" }}
        />
      ),
      sortable: false,
    },
    {
      field: "DELETE",
      headerName: "Delete",
      width: 70,
      renderCell: (params) => (
        <DeleteRoundedIcon
          onClick={() => {
            // Handle delete logic here
          }}
          style={{ cursor: "pointer" }}
        />
      ),
      sortable: false,
    },
    {
      field: "VIEW_MORE",
      headerName: "View More",
      width: 70,
      renderCell: (params) => (
        <ArrowForwardRoundedIcon
          onClick={() => {
            navigate(`/jobinfo?jobid=${params.row.JOB_ID}`)
          }}
          style={{ cursor: "pointer" }}
        />
      ),
      sortable: false,
    },
    {
      field: "COPY_LINK",
      headerName: "Copy Link",
      width: 70,
      renderCell: (params) => (
        <Tooltip title={"Click to copy"} arrow>
          <ContentCopyRoundedIcon
          onClick={() => {
            const rootDomain = window.location.href.match(/^https?:\/\/[^/]+/)?.[0] || '';
            navigator.clipboard.writeText(`${rootDomain}/jobinfo?jobid=${params.row.JOB_ID}`)
          }}
          style={{ cursor: "pointer" }}
        />
        </Tooltip>
      ),
      sortable: false,
    },
  ];

  return (
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
  );
};

export default JobTable;
