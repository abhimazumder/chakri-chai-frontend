/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Grid, InputLabel, Typography } from "@mui/material";
import React, { useState } from "react";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import Textfield from "./Textfield";
import Textarea from "./Textarea";

const styles = {
  addIconStyle: {
    color: "grey",
    fontSize: "2.5rem",
    cursor: "pointer",
  },
  removeIconStyle: {
    color: "grey",
    fontSize: "1.7rem",
    cursor: "pointer",
  },
  addSectionStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "auto",
    border: "4px solid grey",
    borderRadius: 45,
    color: "grey",
    padding: 1,
    cursor: "pointer",
  },
  addSectionIconStyle: {
    marginRight: 2,
    fontSize: "2rem",
  },
};

const Description = ({
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
  SUB_FIELDS,
  ERROR,
  VALUE,
  CHILDREN,
  keyRef,
  handleOnChange,
  setError,
  dispatchFormData,
}) => {
  const [forceRender, setForceRender] = useState(false);

  const getFieldJSX = (field, childFieldName) => {
    switch (field.FIELD_TYPE) {
      case "Textfield":
        return (
          <Textfield
            {...field}
            keyRef={childFieldName}
            handleOnChange={handleOnChange}
          />
        );

      case "Textarea":
        return (
          <Textarea
            {...field}
            keyRef={childFieldName}
            handleOnChange={handleOnChange}
          />
        );

      default:
        return null;
    }
  };

  const createSectionObject = () => {
    if (EXPANDABLE) {
      const newVal = JSON.parse(JSON.stringify(SUB_FIELDS));
      let newKey;
      const childrenKeys = Object.keys(CHILDREN);
      const lastKey = childrenKeys[childrenKeys.length - 1];

      if (!lastKey) newKey = `${FIELD_NAME}-1`;
      else newKey = `${FIELD_NAME}-${Number(lastKey.split("-").pop()) + 1}`;

      Object.values(newVal).forEach((subField) => {
        subField.FIELD_ID = `${subField.FIELD_ID}-${newKey}`;
      });
      dispatchFormData({
        type: "CREATE_SECTION_OBJECT",
        payload: {
          newKey: newKey,
          newVal: newVal,
        },
      });
    }
  };

  const removeSectionObject = (childFieldName) => {
    dispatchFormData({
      type: "REMOVE_SECTION_OBJECT",
      payload: childFieldName,
    });
    setForceRender(!forceRender);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid
            item
            xs="auto"
            alignItems="flex-start"
            justifyContent="flex-start"
            key={`${FIELD_NAME}-label`}
          >
            <InputLabel>{FIELD_LABEL}</InputLabel>
            <Typography variant="body2" sx={{ color: "grey" }}>
              {`Click on the plus icon to add ${FIELD_LABEL.toLowerCase()}`}
            </Typography>
          </Grid>
          <Grid
            item
            xs="auto"
            alignItems="flex-end"
            justifyContent="flex-end"
            key={`${FIELD_NAME}-icon`}
          >
            <AddCircleOutlineOutlined
              style={styles.addIconStyle}
              onClick={() => createSectionObject()}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} key={`${FIELD_LABEL}-children`}>
        <Grid container spacing={2}>
          {Object.keys(CHILDREN).map((childFieldName) => {
            const childField = CHILDREN[childFieldName];
            return (
              <Grid item xs={12} key={childFieldName}>
                <Grid container spacing={2} style={{ paddingBottom: 40 }}>
                  <Grid item xs={12} alignItems="flex-end">
                    <RemoveCircleOutlineRoundedIcon
                      style={styles.removeIconStyle}
                      onClick={() => removeSectionObject(childFieldName)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      {Object.values(childField).map((field) => {
                        return (
                          <Grid
                            item
                            xs={12}
                            sm={field?.SIZE}
                            key={field?.FIELD_ID}
                          >
                            {getFieldJSX(field, childFieldName)}
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(Description);
