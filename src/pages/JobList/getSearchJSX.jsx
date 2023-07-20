/* eslint-disable no-unused-vars */
import { Grid, InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const styles = {
    searchIcon: {
        color: "grey", cursor: 'pointer', fontSize: "2.5rem",
    }
}

const getSearchJSX = (field, handleOnChange) => {
    console.log(field);
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

    default:
      return null;
  }
};

export default getSearchJSX;
