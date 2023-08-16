/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useReducer, useState } from "react";
import "@fontsource/montserrat";
import LoginFormLayout from "../templates/LoginForm";
import { Button, Grid, Typography } from "@mui/material";
import EmailField from "../fields/EmailField";
import PasswordField from "../fields/PasswordField";

const styles = {
  loginButton: {
    borderRadius: 45,
    textTransform: "none",
    background: "linear-gradient(45deg, #ED1C24, #FF5733)",
    fontSize: "1rem",
    fontFamily: "Montserrat, sans-serif",
    color: "#FFFFFF",
    height: "50px",
    width: "100%",
  },
  hoverStyle: {
    textDecoration: "underline",
    transition: "text-decoration 0.5s",
    cursor:"pointer",
  },
};

const formDataReducer = (state, action) => {
  switch (action.type) {
    case "SET_FORM_DATA":
      return action.payload;

    case "UPDATE_FIELD": {
      const { value, fieldName, parentFieldName, keyRef } = action.payload;
      return {
        ...state,
        [fieldName]: {
          ...state[fieldName],
          VALUE: value,
        },
      };
    }
  }
};

const Login = () => {
  const [formData, dispatchFormData] = useReducer(formDataReducer, null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    dispatchFormData({ type: "SET_FORM_DATA", payload: LoginFormLayout });
  }, []);

  const handleOnChange = useCallback(
    (value, fieldName, parentFieldName = null, keyRef = null) => {
      dispatchFormData({
        type: "UPDATE_FIELD",
        payload: {
          value,
          fieldName,
          parentFieldName,
          keyRef,
        },
      });
    },
    []
  );

  const getFieldJSX = (field) => {
    switch (field.FIELD_TYPE) {
      case "EmailField":
        return <EmailField {...field} handleOnChange={handleOnChange} />;

      case "PasswordField":
        return <PasswordField {...field} handleOnChange={handleOnChange} />;

      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(formData);
      }}
    >
      <Grid container rowSpacing={2}>
        {formData &&
          Object.values(formData).map((field) => {
            return (
              <Grid item xs={12} sm={field?.SIZE} key={field?.FIELD_ID}>
                {getFieldJSX(field)}
              </Grid>
            );
          })}
        <Grid item xs={12} container justifyContent="center">
          <Typography
            variant="body2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={isHovered ? {...styles.hoverStyle, color:"#ED1C24"} : {color:"darkgrey"}}
          >
            {"Forgot password?"}
          </Typography>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <Button type="submit" variant="contained" style={styles.loginButton}>
            Log in
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default React.memo(Login);
