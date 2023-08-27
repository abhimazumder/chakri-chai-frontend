/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const styles = {
  searchIcon: {
    color: "grey",
    cursor: "pointer",
    fontSize: "2.5rem",
  },
};

const SearchBar = (props) => {
  const {
    SIZE,
    FIELD_TYPE,
    FIELD_LABEL,
    FIELD_ID,
    FIELD_NAME,
    EXPANDABLE,
    REQUIRED,
    DISABLED,
    PARENT_FIELD_NAME,
    PARENT_FIELD_ID,
    OPTIONS,
    ERROR,
    VALUE,
    keyRef,
    handleOnChange,
    dispatchFormData,
  } = props;
  return (
    <TextField
      id={FIELD_ID}
      label={FIELD_LABEL}
      value={VALUE}
      onChange={(event) => handleOnChange(event.target.value, FIELD_NAME)}
      variant="outlined"
      required={REQUIRED}
      disabled={DISABLED}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon
              style={styles.searchIcon}
              onClick={() => console.log("Clicked!")}
            />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default React.memo(SearchBar);
