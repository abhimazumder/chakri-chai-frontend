/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import FormLayout from "../../templates/FormLayout";
import getFieldJSX from "./getFieldJSX";
import "@fontsource/montserrat";

import { fetchCountryList, fetchStatesByCountry } from "../../services/apis";
import { debounce } from "lodash";

const JobFields = () => {
  const [formData, setFormData] = useState(FormLayout);
  const [open, setOpen] = useState(false);

  const countryList = useMemo(() => fetchCountryList(), []);

  useEffect(() => {
    const fetchFormData = async () => {
      setFormData(FormLayout);
    };

    const fetchOptionData = () => {
      const parentFieldName = "Address";
      const subFieldName = "Country";
      if (formData !== null) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [parentFieldName]: {
            ...prevFormData[parentFieldName],
            SUB_FIELDS: {
              ...prevFormData[parentFieldName]?.SUB_FIELDS,
              [subFieldName]: {
                ...prevFormData[parentFieldName]?.SUB_FIELDS[subFieldName],
                OPTIONS: countryList,
              },
            },
          },
        }));
      }
    };

    fetchFormData();
    fetchOptionData();
  }, [countryList]);

  useEffect(() => {
    const fetchOptionData = () => {
      const parentFieldName = "Address";
      const subFieldName = "State/Province";
      if (formData !== null) {
        if (
          formData?.["Address"]?.SUB_FIELDS?.["Country"]?.VALUE.length !== 0
        ) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [parentFieldName]: {
              ...prevFormData[parentFieldName],
              SUB_FIELDS: {
                ...prevFormData[parentFieldName]?.SUB_FIELDS,
                [subFieldName]: {
                  ...prevFormData[parentFieldName]?.SUB_FIELDS[subFieldName],
                  DISABLED: false,
                  OPTIONS: fetchStatesByCountry(
                    formData?.["Address"]?.SUB_FIELDS?.["Country"]?.VALUE
                  ),
                },
              },
            },
          }));
        }
      }
    };

    fetchOptionData();
  }, [formData?.["Address"]?.SUB_FIELDS?.["Country"]?.VALUE]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    handleOpen();
    setTimeout(() => {
      console.log(formData);
      console.log("Hurray!");
      handleClose();
    }, 3000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const isNullish = (field) => {
    if (field?.REQUIRED === true) {
      if (
        field?.value === null ||
        field?.value === undefined ||
        field?.value === ""
      ) {
        return true;
      }
    }
    return false;
  };

  const debouncedSetFormData = debounce(
    (formData) => setFormData(formData),
    400
  );

  const handleOnChange = (
    value,
    fieldName,
    parentFieldName = null,
    keyRef = null
  ) => {
    const updateFormData = (formData) => {
      const copyFormData = { ...formData };
      if (parentFieldName && keyRef) {
        copyFormData[parentFieldName].CHILDREN[keyRef][fieldName] = {
          ...copyFormData[parentFieldName].CHILDREN[keyRef][fieldName],
          VALUE: value,
          ERROR: isNullish(value) ? true : false,
        };
      } else if (parentFieldName) {
        copyFormData[parentFieldName].SUB_FIELDS[fieldName] = {
          ...copyFormData[parentFieldName].SUB_FIELDS[fieldName],
          VALUE: value,
          ERROR: isNullish(value) ? true : false,
        };
      } else {
        copyFormData[fieldName] = {
          ...copyFormData[fieldName],
          VALUE: value,
          ERROR: isNullish(value) ? true : false,
        };
      }
      return copyFormData;
    };

    debouncedSetFormData(updateFormData);
  };

  const formFields = useMemo(
    () =>
      formData &&
      Object.keys(formData).map((fieldName) =>
        getFieldJSX(
          formData[fieldName],
          handleOnChange,
          formData,
          debouncedSetFormData
        )
      ),
    [formData]
  );

  const styles = {
    roundedPaper: {
      padding: 2,
      marginBottom: 1,
      borderRadius: 3,
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
  };

  return (
    <Container>
      <form onSubmit={handleOnSubmit}>
        <Paper elevation={3} sx={styles.roundedPaper}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={2}>
              {formFields}
              <Grid item xs={12} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  style={styles.submitButton}
                  type="submit"
                >
                  {"Let's Go"}
                </Button>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Paper>
      </form>
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
    </Container>
  );
};

export default JobFields;
