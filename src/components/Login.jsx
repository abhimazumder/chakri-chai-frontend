/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useReducer, useState } from "react";
import "@fontsource/montserrat";
import LoginFormLayout from "../templates/LoginForm";
import { Grid, Typography } from "@mui/material";
import EmailField from "../fields/EmailField";
import PasswordField from "../fields/PasswordField";
import { useDispatch } from "react-redux";
import { setUserLogin } from "../services/userAuthSlice";
import { LoadingButton } from "@mui/lab";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import useAxiosInstance from "../hooks/useAxiosInstance";

const styles = {
  loginButton: {
    borderRadius: 45,
    textTransform: "none",
    background: "linear-gradient(45deg, #ED1C24, #FF5733)",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
    fontSize: "1rem",
    fontFamily: "Montserrat, sans-serif",
    color: "#FFFFFF",
    height: "50px",
    width: "100%",
  },
  hoverStyle: {
    textDecoration: "underline",
    transition: "text-decoration 0.5s",
    cursor: "pointer",
  },
  messageStyle: {
    color: "red",
    fontFamily: "Montserrat, sans-serif",
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

    case "SET_ERROR": {
      const { error, fieldName, parentFieldName, keyRef } = action.payload;
      return {
        ...state,
        [fieldName]: {
          ...state[fieldName],
          ERROR: error,
        },
      };
    }
  }
};

const Login = ({ handleModalClose }) => {
  const [formData, dispatchFormData] = useReducer(formDataReducer, null);
  const [isHovered, setIsHovered] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const instance = useAxiosInstance();

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

  const setError = useCallback(
    (error, fieldName, parentFieldName = null, keyRef = null) => {
      dispatchFormData({
        type: "SET_ERROR",
        payload: {
          error,
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
        return (
          <EmailField
            {...field}
            handleOnChange={handleOnChange}
            setError={setError}
          />
        );

      case "PasswordField":
        return (
          <PasswordField
            {...field}
            handleOnChange={handleOnChange}
            setError={setError}
          />
        );

      default:
        return null;
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { ERROR: emailError, VALUE: emailValue } = formData["Email Address"];
    const { ERROR: passwordError, VALUE: passwordValue } = formData["Password"];

    if (emailError || passwordError) return;

    setLoading(true);

    try {
      const data = { EMAIL_ID: emailValue, PASSWORD: passwordValue };
      Object.keys(data).forEach((key) => {
        data[key] = CryptoJS.AES.encrypt(
          data[key],
          import.meta.env.VITE_CRYPTO_SECRET_KEY
        ).toString();
      });
      const res = await instance.post("/auth/login", data);

      if (res.status === 200) {
        dispatch(
          setUserLogin({
            accessToken: res.data.ACCESS_TOKEN,
            refreshToken: res.data.REFRESH_TOKEN,
            user: res.data.USER,
          })
        );
        handleModalClose();
        navigate("/console");
      } else {
        setMessage(res.data.message);
      }
    } catch (error) {
      setMessage("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(event) => handleFormSubmit(event)}>
      <Grid container rowSpacing={2}>
        {message && (
          <Grid item xs={12} container justifyContent="center">
            <Typography variant="body2" style={styles.messageStyle}>
              {message}
            </Typography>
          </Grid>
        )}
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
            style={
              isHovered
                ? { ...styles.hoverStyle, color: "#ED1C24" }
                : { color: "darkgrey" }
            }
          >
            {"Forgot password?"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={<LoginRoundedIcon />}
            type="submit"
            variant="contained"
            style={styles.loginButton}
          >
            {"Log in"}
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default React.memo(Login);
