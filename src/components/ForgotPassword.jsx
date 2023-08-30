/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import ForgotPasswordFormLayout from "../templates/ForgotPasswordForm";
import EmailField from "../fields/EmailField";
import OTP from "../fields/OTP";

import "@fontsource/montserrat";
import Counter from "./Counter";
import CryptoJS from "crypto-js";
import { useDispatch } from "react-redux";
import { setUserLogin } from "../services/userAuthSlice";
import { useNavigate } from "react-router-dom";
import { instance } from "../services/apis";
import { LoadingButton } from "@mui/lab";

import SendRoundedIcon from "@mui/icons-material/SendRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";

const styles = {
  textStylePrimary: {
    color: "black",
    fontFamily: "Montserrat, sans-serif",
    fontSize: ".9rem",
  },
  textStyleSuccess: {
    color: "#2F9931",
    fontFamily: "Montserrat, sans-serif",
    fontSize: ".9rem",
  },
  textStyleError: {
    color: "#E03131",
    fontFamily: "Montserrat, sans-serif",
    fontSize: ".9rem",
  },
  backButton: {
    textTransform: "none",
    background: "linear-gradient(45deg, #242424, #888888)",
    borderRadius: 35,
    fontSize: "1rem",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
    fontFamily: "Montserrat, sans-serif",
    color: "#FFFFFF",
    height: "50px",
    width: "100%",
  },
  actionButton: {
    textTransform: "none",
    background: "linear-gradient(45deg, #ED1C24, #FF5733)",
    borderRadius: 35,
    fontSize: "1rem",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.50)",
    fontFamily: "Montserrat, sans-serif",
    color: "#FFFFFF",
    height: "50px",
    width: "100%",
  },
  resendButton: {
    textDecoration: "underline",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    outline: "none",
    color: "#242424",
  },
};

const formDataReducer = (state, action) => {
  switch (action.type) {
    case "SET_FORM_DATA":
      return action.payload;

    case "UPDATE_FIELD": {
      const { value, fieldName } = action.payload;
      return {
        ...state,
        [fieldName]: {
          ...state[fieldName],
          VALUE: value,
        },
      };
    }

    case "SET_ERROR": {
      const { error, fieldName } = action.payload;
      return {
        ...state,
        [fieldName]: {
          ...state[fieldName],
          ERROR: error,
        },
      };
    }

    case "TOGGLE_DISABLE": {
      return {
        ...state,
        ["Email Address"]: {
          ...state["Email Address"],
          DISABLED: true,
        },
        ["OTP"]: {
          ...state["OTP"],
          DISABLED: false,
        },
      };
    }
  }
};

const ForgotPassword = ({ handleModalClose, handleForgotPasswordFalse }) => {
  const messages = {
    Initial: {
      currentStage: "Initial",
      textMessage:
        "We'll send an OTP to assist you log in, enter your registered email address",
      buttonMessage: "Send",
    },
    OnEmailError: {
      currentStage: "OnEmailError",
      textMessage: "",
      buttonMessage: "Send",
    },
    OnSend: {
      currentStage: "OnSend",
      textMessage: "An OTP has been sent to the following email address",
      buttonMessage: "Verify",
    },
    OnOTPError: {
      currentStage: "OnOTPError",
      textMessage: "",
      buttonMessage: "Verify",
    },
  };
  const [stage, setStage] = useState(messages.Initial);
  const [formData, dispatchFormData] = useReducer(formDataReducer, null);

  const [showCountdown, setShowCountdown] = useState(false);
  const handleShowCountdownTrue = () => setShowCountdown(true);
  const handleShowCountdownFalse = () => setShowCountdown(false);

  const [sessionToken, setSessionToken] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatchFormData({
      type: "SET_FORM_DATA",
      payload: ForgotPasswordFormLayout,
    });
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

      case "OTP":
        return (
          <OTP {...field} handleOnChange={handleOnChange} setError={setError} />
        );

      default:
        return null;
    }
  };

  const handleSendOnClick = async () => {
    if (
      formData["Email Address"].ERROR ||
      formData["Email Address"].VALUE === ""
    )
      return;
    try {
      setLoading(true);
      const encryptedEmailId = CryptoJS.AES.encrypt(
        formData["Email Address"].VALUE,
        import.meta.env.VITE_CRYPTO_SECRET_KEY
      ).toString();

      const res = await instance.post("/auth/forgotpassword", {
        EMAIL_ID: encryptedEmailId,
      });

      setStage(messages.OnSend);
      handleShowCountdownTrue();
      dispatchFormData({ type: "TOGGLE_DISABLE" });

      const decryptedSessionToken = CryptoJS.AES.decrypt(
        res.data.SESSION_TOKEN,
        import.meta.env.VITE_CRYPTO_SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);

      setSessionToken(decryptedSessionToken);
    } catch (error) {
      setStage({
        ...messages.OnEmailError,
        textMessage: error?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOnClick = async () => {
    if (formData["OTP"].VALUE?.length !== 4) return;
    try {
      setLoading(true);

      const encryptedOTP = CryptoJS.AES.encrypt(
        formData["OTP"].VALUE,
        import.meta.env.VITE_CRYPTO_SECRET_KEY
      ).toString();
      const encryptedSessionToken = CryptoJS.AES.encrypt(
        sessionToken,
        import.meta.env.VITE_CRYPTO_SECRET_KEY
      ).toString();

      const res = await instance.post("/auth/verifyotp", {
        SESSION_TOKEN: encryptedSessionToken,
        OTP: encryptedOTP,
      });

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
      }
    } catch (error) {
      setStage({
        ...messages.OnOTPError,
        textMessage: error?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={12} container justifyContent="center">
          <Typography
            variant="div"
            style={
              stage.currentStage === "Initial"
                ? styles.textStylePrimary
                : stage.currentStage === "OnSend"
                ? styles.textStyleSuccess
                : styles.textStyleError
            }
          >
            <Box sx={{ textAlign: "center", marginLeft: 1, marginRight: 1 }}>
              {stage.textMessage}
            </Box>
          </Typography>
        </Grid>
        {formData &&
          Object.values(formData).map((field) => {
            return (
              <Grid item xs={12} sm={field?.SIZE} key={field?.FIELD_ID}>
                {getFieldJSX(field)}
              </Grid>
            );
          })}
        {(stage.currentStage === "OnSend" ||
          stage.currentStage === "OnOTPError") && (
          <Grid item xs={12} container justifyContent="center">
            {showCountdown ? (
              <Counter handleShowCountdownFalse={handleShowCountdownFalse} />
            ) : (
              <Typography
                variant="body2"
                sx={styles.resendButton}
                component="button"
                onClick={() => {
                  handleSendOnClick();
                  handleShowCountdownTrue();
                }}
              >
                {"Resend"}
              </Typography>
            )}
          </Grid>
        )}
        <Grid item xs={6}>
          <Button
            variant="contained"
            style={styles.backButton}
            onClick={() => handleForgotPasswordFalse()}
          >
            {"Go Back"}
          </Button>
        </Grid>
        <Grid item xs={6} container justifyContent="center">
          <LoadingButton
            variant="contained"
            style={styles.actionButton}
            onClick={
              stage.currentStage === "Initial" ||
              stage.currentStage === "OnEmailError"
                ? () => handleSendOnClick()
                : () => handleVerifyOnClick()
            }
            loading={loading}
            loadingPosition="start"
            startIcon={
              stage.currentStage === "Initial" ||
              stage.currentStage === "OnEmailError" ? (
                <SendRoundedIcon />
              ) : (
                <DoneRoundedIcon />
              )
            }
          >
            <span>{stage.buttonMessage}</span>
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ForgotPassword;
