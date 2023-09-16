/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useDropzone } from "react-dropzone";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Box, InputLabel, Stack, Typography } from "@mui/material";

const styles = {
  boxStyle: {
    width: "100%",
    height: 150,
    backgroundColor: "rgba(36, 36, 36, 0.05)",
    border: "1px dashed grey",
    color: "grey",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
    marginBottom: 1,
  },
  innerBoxStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  inputStyle: {
    display: "none",
  },
};

const Attachment = ({
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
  ERROR,
  VALUE,
  keyRef,
  handleOnChange,
  setError,
  dispatchFormData,
}) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const [warning, setWarning] = useState(null);
  const displayWarning = (message) => setWarning(message);
  const hideWarning = () => setWarning(null);

  useEffect(() => {
    if (ERROR) {
      setWarning(`${FIELD_NAME} is required.`);
    } else {
      hideWarning();
    }
  }, [FIELD_NAME, ERROR]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!["pdf", "doc", "docx"].includes(file.name.split(".").pop())) {
      displayWarning("Incompatible File");
      return;
    }
    hideWarning();
    setUploadedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      const base64data = reader.result.split(",")[1];
      handleOnChange(
        { BASE64_DATA: base64data, FILE_NAME: file.name },
        FIELD_NAME,
        PARENT_FIELD_NAME,
        keyRef
      );
      dispatchFormData({
        type: "SET_ERROR",
        payload: {
          error: false,
          fieldName: FIELD_NAME,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = (event) => {
    event.stopPropagation();
    setUploadedFile(null);
    handleOnChange("", FIELD_NAME, PARENT_FIELD_NAME, keyRef);
    dispatchFormData({
      type: "SET_ERROR",
      payload: {
        error: true,
        fieldName: FIELD_NAME,
        parentFieldName: PARENT_FIELD_NAME,
        keyRef: keyRef,
      },
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    acceptedFiles: "application/pdf,.doc,.docx",
    multiple: false,
  });

  return (
    <Box>
      <InputLabel>{FIELD_LABEL}</InputLabel>
      <Box {...getRootProps()} sx={styles.boxStyle}>
        <label htmlFor="file-input">
          <input
            {...getInputProps()}
            type="file"
            id="file-input"
            style={styles.inputStyle}
          />
          <DriveFolderUploadOutlinedIcon fontSize="large" />
        </label>

        {uploadedFile ? (
          <Box style={styles.innerBoxStyle}>
            <Typography
              fontSize="small"
              variant="body2"
              style={{ marginRight: 5 }}
            >
              {uploadedFile.name}
            </Typography>
            <CancelRoundedIcon
              fontSize="small"
              style={{ cursor: "pointer" }}
              onClick={handleRemoveFile}
            />
          </Box>
        ) : (
          <Stack style={{ alignItems: "center" }}>
            <Typography variant="body1">
              {"Drop a file here or click to select a file"}
            </Typography>
            <Typography variant="caption">
              {"Accepted file types: .pdf, .doc and .docx"}
            </Typography>
          </Stack>
        )}
      </Box>
      {warning && (
        <Typography color="error" variant="body2">
          {warning}
        </Typography>
      )}
    </Box>
  );
};

export default React.memo(Attachment);
