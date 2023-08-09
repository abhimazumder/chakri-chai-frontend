/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import JobLayout from "../../templates/JobLayout";
import CreateJobForm from "./CreateJobForm";
import { fetchCountryList } from "../../services/apis";
import shortid from "shortid";
import { Box } from "@mui/material";

const CreateJobIndex = () => {
  const [jobLayout, setJobLayout] = useState(null);

  const countryList = useMemo(() => fetchCountryList(), []);

  useEffect(() => {
    window.scrollTo(0, 0);

    setJobLayout(JobLayout);
  }, []);

  useEffect(() => {
    const fetchCountryOptions = async () => {
      setJobLayout((jobLayout) => ({
        ...jobLayout,
        ["Job ID"]: {
          ...JobLayout["Job ID"],
          VALUE: shortid.generate().slice(0, 12),
        },
        ["Posting Date"]: {
          ...JobLayout["Posting Date"],
          VALUE: new Date().toISOString(),
        },
        ["Job Locations"]: {
          ...jobLayout["Job Locations"],
          SUB_FIELDS: {
            ...jobLayout["Job Locations"].SUB_FIELDS,
            Country: {
              ...jobLayout["Job Locations"].SUB_FIELDS.Country,
              OPTIONS: countryList,
            },
          },
        },
      }));
    };

    fetchCountryOptions();
  }, [countryList]);

  return <Box>{jobLayout && <CreateJobForm jobLayout={jobLayout} />}</Box>;
};

export default CreateJobIndex;
