/* eslint-disable no-unused-vars */
import { Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const styles = {
    searchIcon: {
        color: "grey", cursor: 'pointer', fontSize: "2.5rem",
    }
}

const getSearchJSX = (field, handleOnChange) => {
  switch (field.FIELD_TYPE) {
    case "Textfield":
      return (
        <Grid item xs={12} sm={field.SIZE} key={field?.FIELD_ID}>
          <TextField
            id={field?.FIELD_ID}
            label={field?.FIELD_LABLE}
            onChange={(event) =>
              handleOnChange(event.target.value, field?.FIELD_NAME)
            }
            variant="outlined"
            required={field?.REQUIRED}
            fullWidth
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon style={styles.searchIcon} onClick={() => console.log("Clicked!")}/>
                  </InputAdornment>
                ),
              }}
            placeholder={field?.PLACEHOLDER}
          />
        </Grid>
      );

      case "Dropdown":
        return (
          <Grid item xs={12} sm={field.SIZE} key={field?.FIELD_ID}>
            <InputLabel>{field?.FIELD_LABLE}</InputLabel>
            <Select
              id={field?.FIELD_ID}
              label={field?.FIELD_LABLE}
              value={field?.VALUE}
              onChange={(event) => {
                handleOnChange(
                  event.target.value,
                  field?.FIELD_NAME,
                );
              }}
              variant="outlined"
              required={field?.REQUIRED}
              disabled={field?.DISABLED}
              fullWidth
            >
              {field?.OPTIONS.map((option) => (
                <MenuItem
                  key={option.VALUE}
                  id={option.ID}
                  value={option.VALUE}
                  disabled={option.DISABLED ? true : false}
                >
                  {option.VALUE}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        );

    default:
      return null;
  }
};

export default getSearchJSX;
