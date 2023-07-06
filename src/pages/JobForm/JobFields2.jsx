/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

import FormLayout from "../../templates/FormLayout";
import { getCountries, getStatesByCountryCode } from '../../services/apis';

const JobFields = () => {
  const [formData, setFormData] = useState(FormLayout);

  const [countryOptions, setCountryOptions] = useState([]);
  const [statesOptions, setStatesOptions] = useState([]); 

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

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // if (checkError(formData)) return;
    console.log('Hurray!');
  };

  const isNullish = (field) => {
    if (field?.REQUIRED === true) {
      if (
        field?.value === null ||
        field?.value === undefined ||
        field?.value === ''
      ) {
        return true;
      }
    }
    return false;
  };

  const handleOnChange = (value, fieldName, parentFieldName = null) => {
    if (parentFieldName) {
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
            }
          }
        }
      })
    } else {
      setFormData({
        ...formData,
        [fieldName]: {
          ...formData[fieldName],
          VALUE: value,
          ERROR: isNullish(value) ? true : false,
        }
      });
    }
  };

  const getFieldJSX = (field, parentFieldName = null) => {
    console.log()
    switch (field.FIELD_TYPE) {
      case 'Textfield':
        return (
          <Grid item xs={12} sm={field.SIZE} key={field?.FIELD_NAME}>
            <TextField
              id={field?.FIELD_ID}
              label={field?.FIELD_LABLE}
              onChange={(event) =>
                handleOnChange(event.target.value, field?.FIELD_NAME, parentFieldName)
              }
              variant="outlined"
              required={field?.REQUIRED}
              error={field?.ERROR}
              fullWidth
            />
          </Grid>
        );

      case 'Dropdown':
        return (
          <Grid item xs={12} sm={field.SIZE} key={field?.FIELD_NAME}>
            <InputLabel>{field?.FIELD_LABLE}</InputLabel>
            <Select
              id={field?.FIELD_ID}
              label={field?.FIELD_LABLE}
              value={field?.VALUE}
              onChange={(event) =>
                handleOnChange(event.target.value, field?.FIELD_NAME, parentFieldName)
              }
              variant="outlined"
              required={field?.REQUIRED}
              error={field?.ERROR}
              fullWidth
            >
              {field?.OPTIONS.map((option) => (
                <MenuItem key={option.VALUE} value={option.VALUE} disabled={option.DISABLED}>
                  {option.VALUE}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        );

      case 'Date':
        return (
          <Grid item xs={12} sm={field.SIZE} key={field?.FIELD_NAME}>
            <InputLabel>{field?.FIELD_LABLE}</InputLabel>
            <DatePicker
              id={field?.FIELD_ID}
              onChange={(value) =>
                handleOnChange(value, field?.FIELD_NAME, parentFieldName)
              }
              format="yyyy-MM-dd"
              required={field?.REQUIRED}
              error={field?.ERROR}
              sx={{ width: '100%' }}
            />
          </Grid>
        );

      case 'Email':
        return (
          <Grid item xs={12} sm={field.SIZE} key={field?.FIELD_NAME}>
            <TextField
              id={field?.FIELD_ID}
              label={field?.FIELD_LABLE}
              onChange={(event) =>
                handleOnChange(event.target.value, field?.FIELD_NAME, parentFieldName)
              }
              variant="outlined"
              type="email"
              required={field?.REQUIRED}
              error={field?.ERROR}
              fullWidth
              inputProps={{
                pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
                title: 'Enter a valid email address',
              }}
            />
          </Grid>
        );

      case 'Phone Number':
        return (
          <Grid item xs={12} sm={field.SIZE} key={field?.FIELD_NAME}>
            <TextField
              id={field?.FIELD_ID}
              label={field?.FIELD_LABLE}
              onChange={(event) =>
                handleOnChange(event.target.value, field?.FIELD_NAME, parentFieldName)
              }
              variant="outlined"
              type="tel"
              required={field?.REQUIRED}
              error={field?.ERROR}
              fullWidth
              InputProps={{
                maxLength: 10,
              }}
            />
          </Grid>
        );

      case 'Number':
        return (
          <Grid item xs={12} sm={field.SIZE} key={field?.FIELD_NAME}>
            <TextField
              id={field?.FIELD_ID}
              label={field?.FIELD_LABLE}
              onChange={(event) =>
                handleOnChange(event.target.value, field?.FIELD_NAME, parentFieldName)
              }
              variant="outlined"
              type="number"
              required={field?.REQUIRED}
              error={field?.ERROR}
              fullWidth
              inputProps={{
                inputMode: 'numeric',
              }}
            />
          </Grid>
        );

      case 'Dynamic Lookup':
        return (
          <Grid item xs={12} sm={field.SIZE} key={field?.FIELD_NAME}>
            <Autocomplete
              id={field?.FIELD_ID}
              label={field?.FIELD_LABLE}
              options={
                field?.FIELD_NAME === 'Country' ?
                  countryOptions :
                field?.FIELD_NAME === 'State/Province' ?
                  statesOptions : []
              }
              getOptionLabel={(option) => option.COUNTRY_NAME}
              inputValue={field?.VALUE}
              onChange={(event, value) => {
                handleOnChange((value, field?.FIELD_NAME, parentFieldName))
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={field?.FIELD_LABLE}
                  variant="outlined"
                  required={field?.REQUIRED}
                  error={field?.ERROR}
                  fullWidth
                />
              )}
            />
          </Grid>
        )

      case 'Address':
        return (
          <>
            {
              Object.keys(field?.SUB_FIELDS).map(subField => {
                return getFieldJSX(formData[field?.FIELD_NAME].SUB_FIELDS[subField], field?.FIELD_NAME);
              })
            }
          </>
        )

      default:
        return null;
    }
  };

  return (
    <Container>
      <form onSubmit={handleOnSubmit}>
        <Paper elevation={3} sx={styles.roundedPaper}>
          <Box p={1}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container spacing={2}>
                {
                  Object.keys(formData).map((fieldName) => {
                    return getFieldJSX(formData[fieldName]); // formData[fieldName] = {SIZE: "", FIELD_TYPE: "", ...}
                  })
                }
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
