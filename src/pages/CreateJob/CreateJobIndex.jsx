/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import JobLayout from "../../templates/JobLayout";
import CreateJobForm from "./CreateJobForm";
import { fetchCountryList } from "../../services/apis";
import shortid from "shortid";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCreateJobFromReduxState } from "../../services/createJobFormSlice";

const CreateJobIndex = () => {
  const [jobLayout, setJobLayout] = useState(null);
  const formData = useSelector((state) => state.createJobFrom.formData);
  const dispatch = useDispatch();

  const countryList = useMemo(() => fetchCountryList(), []);

  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const setupJobLayout = useCallback(
    (JobLayout) => {
      return {
        ...JobLayout,
        ["Job ID"]: {
          ...JobLayout["Job ID"],
          VALUE: shortid.generate().slice(0, 12),
        },
        ["Posting Date"]: {
          ...JobLayout["Posting Date"],
          VALUE: new Date().toISOString(),
        },
        ["Job Locations"]: {
          ...JobLayout["Job Locations"],
          SUB_FIELDS: {
            ...JobLayout["Job Locations"].SUB_FIELDS,
            Country: {
              ...JobLayout["Job Locations"].SUB_FIELDS.Country,
              OPTIONS: countryList,
            },
          },
        },
      };
    },
    [countryList]
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    if (formData === null) {
      const updatedJobLayout = setupJobLayout(JobLayout);
      setJobLayout(updatedJobLayout);
      dispatch(setCreateJobFromReduxState({ formData: updatedJobLayout }));
    } else setJobLayout(formData);

    handleClose();
  }, [formData, setupJobLayout, dispatch]);

  return (
    <>
      <Box>{jobLayout && <CreateJobForm jobLayout={jobLayout} />}</Box>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CreateJobIndex;
