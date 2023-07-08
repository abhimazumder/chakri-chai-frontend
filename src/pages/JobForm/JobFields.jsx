/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import FormLayout from '../../templates/FormLayout';
import getFieldJSX from './getFieldJSX';

import { fetchCountryList, fetchStatesByCountry } from '../../services/apis';

const JobFields = () => {
  const [formData, setFormData] = useState(FormLayout);

  const styles = {
    roundedPaper: {
      padding: 2,
      marginBottom: 1,
      borderRadius: 3,
    },
    submitButton: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: 1,
      marginTop: 2,
    },
    buttonColor: {
      backgroundColor: '#FF3131',
      textTransform: 'none',
    },
  };

  useEffect(() => {
    const fetchFormData = async () => {
      setFormData(FormLayout);
    };

    const fetchOptionData = () => {
      const parentFieldName = 'Address';
      const subFieldName = 'Country';
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
      const parentFieldName = 'Address';
      const subFieldName = 'State/Province';
      if (formData !== null) {
        if (formData?.['Address']?.SUB_FIELDS?.['Country']?.VALUE.length !== 0)
          setFormData({
            ...formData,
            [parentFieldName]: {
              ...formData[parentFieldName],
              SUB_FIELDS: {
                ...formData[parentFieldName]?.SUB_FIELDS,
                [subFieldName]: {
                  ...formData[parentFieldName]?.SUB_FIELDS[subFieldName],
                  DISABLED: false,
                  OPTIONS: fetchStatesByCountry(formData?.['Address']?.SUB_FIELDS?.['Country']?.VALUE)
                },
              },
            },
          });
      }
    };

    fetchOptionData();

  }, [formData?.['Address']?.SUB_FIELDS?.['Country']?.VALUE])

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    console.log('Hurray!');
  };

  const isNullish = (field) => {
    if (field?.REQUIRED === true) {
      if (field?.value === null || field?.value === undefined || field?.value === '') {
        return true;
      }
    }
    return false;
  };

  const handleOnChange = (value, fieldName, parentFieldName = null, keyRef = null) => {
    if (parentFieldName && keyRef) {
      setFormData({
        ...formData,
        [parentFieldName]: {
          ...formData[parentFieldName],
          CHILDREN: {
            ...formData[parentFieldName].CHILDREN,
            [keyRef]: {
              ...formData[parentFieldName].CHILDREN[keyRef],
              [fieldName]: {
                ...formData[parentFieldName].CHILDREN[keyRef][fieldName],
                VALUE: value,
                ERROR: isNullish(value) ? true : false,
              }
            }
          }
        }
      });
    } else if (parentFieldName) {
      setFormData({
        ...formData,
        [parentFieldName]: {
          ...formData[parentFieldName],
          SUB_FIELDS: {
            ...formData[parentFieldName].SUB_FIELDS,
            [fieldName]: {
              ...formData[parentFieldName].SUB_FIELDS[fieldName],
              VALUE: value,
              ERROR: isNullish(value) ? true : false,
            },
          },
        },
      });
    } else {
      setFormData({
        ...formData,
        [fieldName]: {
          ...formData[fieldName],
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
                {formData && Object.keys(formData).map((fieldName) =>
                  getFieldJSX(formData[fieldName], handleOnChange, formData, setFormData)
                )}
              </Grid>
            </LocalizationProvider>
          </Box>
          <Box sx={styles.submitButton}>
            <Button variant="contained" style={styles.buttonColor} type="submit">
              Let's Go
            </Button>
          </Box>
        </Paper>
      </form>
    </Container>
  );
};

export default JobFields;
