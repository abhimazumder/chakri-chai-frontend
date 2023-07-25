/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import { Button, Container, Grid, Paper } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { debounce } from "lodash";
import { fetchCountryList } from "../../services/apis";
import "@fontsource/montserrat";
import getFieldJSX from "./getFieldJSX";

const CreateJobFields = ({ jobLayout }) => {
  const [formData, setFormData] = useState(jobLayout);

  const countryList = useMemo(() => fetchCountryList(), []);
  
  useEffect(() => {
    const fetchCountryOptions = async () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        "Job Locations": {
          ...prevFormData["Job Locations"],
          SUB_FIELDS: {
            ...prevFormData["Job Locations"].SUB_FIELDS,
            Country: {
              ...prevFormData["Job Locations"].SUB_FIELDS.Country,
              OPTIONS: countryList,
            },
          },
        },
      }));
    };

    fetchCountryOptions();
  }, []);

  const debouncedSetFormData = debounce(
    (formData) => setFormData(formData),
    400
  );

  const handleOnChange = (value, fieldName, parentFieldName, keyRef = null) => {
    const updateFormData = (prevFormData) => {
      const copyFormData = { ...prevFormData };

      if (keyRef) {
        copyFormData[parentFieldName].CHILDREN[keyRef][fieldName] = {
          ...copyFormData[parentFieldName].CHILDREN[keyRef][fieldName],
          VALUE: value,
          ERROR: isNullish(value),
        };
      } else if (parentFieldName) {
        copyFormData[parentFieldName].SUB_FIELDS[fieldName] = {
          ...copyFormData[parentFieldName].SUB_FIELDS[fieldName],
          VALUE: value,
          ERROR: isNullish(value),
        };
      } else {
        copyFormData[fieldName] = {
          ...copyFormData[fieldName],
          VALUE: value,
          ERROR: isNullish(value),
        };
      }

      return copyFormData;
    };

    setFormData(updateFormData);
  };

  const isNullish = (field) =>
    field?.REQUIRED &&
    (field?.value === null || field?.value === undefined || field?.value === "");

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log("Submit!");
  };

  const formFields = useMemo(
    () =>
      formData &&
      Object.values(formData).map((field) =>
        getFieldJSX(field, handleOnChange, formData, setFormData)
      ),
    [formData, handleOnChange]
  );

  const styles = {
    roundedPaper: {
      padding: 2,
      marginBottom: 1,
      borderRadius: 6,
    },
    submitButton: {
      textTransform: "none",
      backgroundColor: "#ED1C24",
      borderRadius: 50,
      width: 120,
      height: 40,
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
      margin: 3,
      fontFamily: "Montserrat, sans-serif",
    },
    previewButton: {
      textTransform: "none",
      backgroundColor: "#242424",
      borderRadius: 50,
      width: 120,
      height: 40,
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
      margin: 3,
      fontFamily: "Montserrat, sans-serif",
    },
  };

  return (
    <Container>
      <form onSubmit={handleOnSubmit}>
        <Paper elevation={3} style={styles.roundedPaper}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container rowSpacing={8} columnSpacing={2} padding={2}>
              {formFields}
              <Grid item xs={12} display="flex" justifyContent="flex-end">
                <Button variant="contained" style={styles.previewButton}>
                  {"Preview"}
                </Button>
                <Button
                  variant="contained"
                  style={styles.submitButton}
                  type="submit"
                >
                  {"Create"}
                </Button>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Paper>
      </form>
    </Container>
  );
};

export default CreateJobFields;
