/* eslint-disable no-unused-vars */
import { Container, Grid, Paper, Switch } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { useNavigate } from "react-router-dom";

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
};

const columns = [
  {
    field: "id",
    headerName: "Job ID",
    width: 120,
  },
  {
    field: "JOB_TITLE",
    headerName: "Job Title",
    width: 200,
  },
  {
    field: "POSTING_DATE",
    headerName: "Posting Date",
    type: "date",
    width: 120,
    valueGetter: (params) => {
      const postingDateStr = params.row.POSTING_DATE;
      if (postingDateStr) {
        return new Date(postingDateStr);
      }
      return null;
    },
  },
  {
    field: "APPLICATION_DEADLINE",
    headerName: "Application Deadline",
    type: "date",
    width: 120,
    valueGetter: (params) => {
      const deadlineDateStr = params.row.APPLICATION_DEADLINE;
      if (deadlineDateStr) {
        return new Date(deadlineDateStr);
      }
      return null;
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
    width: 130,
    renderCell: (params) => (
      <Switch
        {...params}
        checked={params.row.ACTIVE_STATUS}
        // Handle toggle logic here
      />
    ),
  },
  {
    field: "EDIT",
    headerName: "Edit",
    width: 80,
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
    width: 80,
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
    width: 80,
    renderCell: (params) => (
      <ArrowForwardRoundedIcon
        onClick={() => {
          // Handle view more logic here
        }}
        style={{ cursor: "pointer" }}
      />
    ),
    sortable: false,
  },
];

const data = [
  {
    id: "A1B2C3D4",
    JOB_TITLE: "Software Engineer",
    POSTING_DATE: "2023-08-01",
    APPLICATION_DEADLINE: "2023-08-15",
    TOTAL_APPLICATIONS: 50,
    ACTIVE_STATUS: true,
  },
  {
    id: "E5F6G7H8",
    JOB_TITLE: "Data Analyst",
    POSTING_DATE: "2023-08-05",
    APPLICATION_DEADLINE: "2023-08-20",
    TOTAL_APPLICATIONS: 35,
    ACTIVE_STATUS: true,
  },
  {
    id: "I9J0K1L2",
    JOB_TITLE: "Product Manager",
    POSTING_DATE: "2023-07-20",
    APPLICATION_DEADLINE: "2023-08-10",
    TOTAL_APPLICATIONS: 75,
    ACTIVE_STATUS: false,
  },
  {
    id: "M3N4O5P6",
    JOB_TITLE: "Graphic Designer",
    POSTING_DATE: "2023-08-10",
    APPLICATION_DEADLINE: "2023-08-25",
    TOTAL_APPLICATIONS: 28,
    ACTIVE_STATUS: true,
  },
  {
    id: "Q7R8S9T0",
    JOB_TITLE: "Sales Manager",
    POSTING_DATE: "2023-08-15",
    APPLICATION_DEADLINE: "2023-08-30",
    TOTAL_APPLICATIONS: 45,
    ACTIVE_STATUS: true,
  },
  {
    id: "U1V2W3X4",
    JOB_TITLE: "Content Writer",
    POSTING_DATE: "2023-08-02",
    APPLICATION_DEADLINE: "2023-08-18",
    TOTAL_APPLICATIONS: 62,
    ACTIVE_STATUS: true,
  },
  {
    id: "Y5Z6A7B8",
    JOB_TITLE: "HR Specialist",
    POSTING_DATE: "2023-07-25",
    APPLICATION_DEADLINE: "2023-08-10",
    TOTAL_APPLICATIONS: 39,
    ACTIVE_STATUS: false,
  },
  {
    id: "C9D0E1F2",
    JOB_TITLE: "Quality Assurance Engineer",
    POSTING_DATE: "2023-08-05",
    APPLICATION_DEADLINE: "2023-08-20",
    TOTAL_APPLICATIONS: 57,
    ACTIVE_STATUS: true,
  },
  {
    id: "G3H4I5J6",
    JOB_TITLE: "Marketing Coordinator",
    POSTING_DATE: "2023-08-12",
    APPLICATION_DEADLINE: "2023-08-27",
    TOTAL_APPLICATIONS: 31,
    ACTIVE_STATUS: true,
  },
  {
    id: "K7L8M9N0",
    JOB_TITLE: "Financial Analyst",
    POSTING_DATE: "2023-08-18",
    APPLICATION_DEADLINE: "2023-09-02",
    TOTAL_APPLICATIONS: 49,
    ACTIVE_STATUS: true,
  },
  {
    id: "P1Q2R3S4",
    JOB_TITLE: "Customer Support Representative",
    POSTING_DATE: "2023-08-08",
    APPLICATION_DEADLINE: "2023-08-23",
    TOTAL_APPLICATIONS: 68,
    ACTIVE_STATUS: true,
  },
  {
    id: "T5U6V7W8",
    JOB_TITLE: "Operations Manager",
    POSTING_DATE: "2023-08-14",
    APPLICATION_DEADLINE: "2023-08-29",
    TOTAL_APPLICATIONS: 55,
    ACTIVE_STATUS: true,
  },
  {
    id: "X9Y0Z1A2",
    JOB_TITLE: "Supply Chain Coordinator",
    POSTING_DATE: "2023-08-06",
    APPLICATION_DEADLINE: "2023-08-21",
    TOTAL_APPLICATIONS: 37,
    ACTIVE_STATUS: true,
  },
  {
    id: "B3C4D5E6",
    JOB_TITLE: "IT Support Technician",
    POSTING_DATE: "2023-08-16",
    APPLICATION_DEADLINE: "2023-08-31",
    TOTAL_APPLICATIONS: 42,
    ACTIVE_STATUS: false,
  },
  {
    id: "F7G8H9I0",
    JOB_TITLE: "Administrative Assistant",
    POSTING_DATE: "2023-08-09",
    APPLICATION_DEADLINE: "2023-08-24",
    TOTAL_APPLICATIONS: 29,
    ACTIVE_STATUS: true,
  },
  {
    id: "J1K2L3M4",
    JOB_TITLE: "Project Manager",
    POSTING_DATE: "2023-08-03",
    APPLICATION_DEADLINE: "2023-08-18",
    TOTAL_APPLICATIONS: 63,
    ACTIVE_STATUS: true,
  },
  {
    id: "N5O6P7Q8",
    JOB_TITLE: "Research Scientist",
    POSTING_DATE: "2023-08-11",
    APPLICATION_DEADLINE: "2023-08-26",
    TOTAL_APPLICATIONS: 58,
    ACTIVE_STATUS: true,
  },
  {
    id: "R9S0T1U2",
    JOB_TITLE: "Legal Counsel",
    POSTING_DATE: "2023-08-17",
    APPLICATION_DEADLINE: "2023-09-01",
    TOTAL_APPLICATIONS: 47,
    ACTIVE_STATUS: false,
  },
  {
    id: "V3W4X5Y6",
    JOB_TITLE: "Social Media Manager",
    POSTING_DATE: "2023-08-07",
    APPLICATION_DEADLINE: "2023-08-22",
    TOTAL_APPLICATIONS: 34,
    ACTIVE_STATUS: true,
  },
  {
    id: "Z7A8B9C0",
    JOB_TITLE: "UX/UI Designer",
    POSTING_DATE: "2023-08-13",
    APPLICATION_DEADLINE: "2023-08-28",
    TOTAL_APPLICATIONS: 52,
    ACTIVE_STATUS: true,
  },
  {
    id: "D1E2F3G4",
    JOB_TITLE: "Software Developer",
    POSTING_DATE: "2023-08-02",
    APPLICATION_DEADLINE: "2023-08-17",
    TOTAL_APPLICATIONS: 45,
    ACTIVE_STATUS: true,
  },
  // ... continue with more data entries
];

const JobPostingsIndex = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Paper elevation={3} style={styles.roundedPaper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ArrowBackRoundedIcon
              style={styles.backIconStyle}
              onClick={() => navigate(-1)}
            />
          </Grid>
          <Grid item xs={12} style={{ minHeight: 200 }}>
            <DataGrid
              rows={data}
              columns={columns}
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
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default JobPostingsIndex;
