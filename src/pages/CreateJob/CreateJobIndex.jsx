/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import JobLayout from "../../templates/JobLayout";
import { Container, Grid, Paper } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import getFieldJSX from "./getFieldJSX";
import { fetchCountryList } from "../../services/apis";

import { debounce } from "lodash";

const CreateJobIndex = () => {
  const [formData, setFormData] = useState(JobLayout);

  const countryListOptions = useMemo(() => fetchCountryList(), []);

  useEffect(() => {
    const fetchOptionData = () => {
      const parentFieldName = "Job Locations";
      const subFieldName = "Country";
      const copyFormData = { ...formData };
      copyFormData[parentFieldName].SUB_FIELDS[subFieldName].OPTIONS =
        countryListOptions;
      setFormData(copyFormData);
    };

    fetchOptionData();
  }, [countryListOptions]);

  const handleOnSubmit = () => {
    console.log("Submit!");
  };

  const debouncedSetFormData = debounce(
    (formData) => setFormData(formData),
    400
  );

  const handleOnChange = (value, fieldName, parentFieldName, keyRef = null) => {
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      if (keyRef) {
        updatedFormData[parentFieldName].CHILDREN[keyRef][fieldName].VALUE =
          value;
      } else if (parentFieldName) {
        updatedFormData[parentFieldName].SUB_FIELDS[fieldName].VALUE = value;
      } else {
        updatedFormData[fieldName].VALUE = value;
      }

      debouncedSetFormData(updatedFormData);

      return updatedFormData;
    });
  };

  const formFields = useMemo(
    () =>
      formData &&
      Object.values(formData).map((field) =>
        getFieldJSX(field, handleOnChange, formData, debouncedSetFormData)
      ),
    [formData, handleOnChange, setFormData]
  );

  const styles = {
    roundedPaper: {
      padding: 2,
      marginBottom: 1,
      borderRadius: 3,
    },
  };

  return (
    <Container>
      <form onSubmit={handleOnSubmit}>
        <Paper elevation={3} style={styles.roundedPaper}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container rowSpacing={8} columnSpacing={2} padding={1}>
              {formFields}
            </Grid>
          </LocalizationProvider>
        </Paper>
      </form>
    </Container>
  );
};

export default CreateJobIndex;
