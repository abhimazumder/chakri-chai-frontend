/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Snackbar,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import FormLayout from "../../templates/FormLayout";
import getFieldJSX from "./getFieldJSX";

import { fetchCountryList, fetchStatesByCountry } from "../../services/apis";

const JobFields = () => {
  const [formData, setFormData] = useState(FormLayout);
  const [open, setOpen] = useState(false);

  const styles = {
    roundedPaper: {
      padding: 2,
      marginBottom: 1,
      borderRadius: 3,
    },
    buttonBox: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 40,
      marginRight: 10,
      marginBottom: 20,
    },
    submitButton: {
      backgroundColor: "#ED1C24",
      textTransform: "none",
      paddingX: 20,
      borderRadius: 50,
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
    },
  };

  useEffect(() => {
    const fetchFormData = async () => {
      setFormData(FormLayout);
    };

    const fetchOptionData = () => {
      const parentFieldName = "Address";
      const subFieldName = "Country";
      if (formData !== null) {
        setFormData({
          ...formData,
          [parentFieldName]: {
            ...formData[parentFieldName],
            SUB_FIELDS: {
              ...formData[parentFieldName]?.SUB_FIELDS,
              [subFieldName]: {
                ...formData[parentFieldName]?.SUB_FIELDS[subFieldName],
                OPTIONS: fetchCountryList(),
              },
            },
          },
        });
      }
    };

    fetchOptionData();
  }, []);

  useEffect(() => {
    const fetchOptionData = () => {
      const parentFieldName = "Address";
      const subFieldName = "State/Province";
      if (formData !== null) {
        if (formData?.["Address"]?.SUB_FIELDS?.["Country"]?.VALUE.length !== 0)
          setFormData({
            ...formData,
            [parentFieldName]: {
              ...formData[parentFieldName],
              SUB_FIELDS: {
                ...formData[parentFieldName]?.SUB_FIELDS,
                [subFieldName]: {
                  ...formData[parentFieldName]?.SUB_FIELDS[subFieldName],
                  DISABLED: false,
                  OPTIONS: fetchStatesByCountry(
                    formData?.["Address"]?.SUB_FIELDS?.["Country"]?.VALUE
                  ),
                },
              },
            },
          });
      }
    };

    fetchOptionData();
  }, [formData?.["Address"]?.SUB_FIELDS?.["Country"]?.VALUE]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    handleOpen("Backdrop");
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

  const handleOnChange = (
    value,
    fieldName,
    parentFieldName = null,
    keyRef = null
  ) => {
    const copyFormData = JSON.parse(JSON.stringify(formData));
    if (parentFieldName && keyRef) {
      setFormData({
        ...copyFormData,
        [parentFieldName]: {
          ...copyFormData[parentFieldName],
          CHILDREN: {
            ...copyFormData[parentFieldName].CHILDREN,
            [keyRef]: {
              ...copyFormData[parentFieldName].CHILDREN[keyRef],
              [fieldName]: {
                ...copyFormData[parentFieldName].CHILDREN[keyRef][fieldName],
                VALUE: value,
                ERROR: isNullish(value) ? true : false,
              },
            },
          },
        },
      });
    } else if (parentFieldName) {
      setFormData({
        ...copyFormData,
        [parentFieldName]: {
          ...copyFormData[parentFieldName],
          SUB_FIELDS: {
            ...copyFormData[parentFieldName].SUB_FIELDS,
            [fieldName]: {
              ...copyFormData[parentFieldName].SUB_FIELDS[fieldName],
              VALUE: value,
              ERROR: isNullish(value) ? true : false,
            },
          },
        },
      });
    } else {
      setFormData({
        ...copyFormData,
        [fieldName]: {
          ...copyFormData[fieldName],
          VALUE: value,
          ERROR: isNullish(value) ? true : false,
        },
      });
    }
  };

  return (
    <Container>
      <form onSubmit={handleOnSubmit}>
        <Paper elevation={3} sx={styles.roundedPaper}>
          <Box p={1}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container spacing={2}>
                {formData &&
                  Object.keys(formData).map((fieldName) =>
                    getFieldJSX(
                      formData[fieldName],
                      handleOnChange,
                      formData,
                      setFormData
                    )
                  )}
              </Grid>
            </LocalizationProvider>
          </Box>
          <Box style={styles.buttonBox}>
            <Button
              variant="contained"
              style={styles.submitButton}
              type="submit"
            >
              Let's Go
            </Button>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </Box>
        </Paper>
      </form>
    </Container>
  );
};

export default JobFields;
