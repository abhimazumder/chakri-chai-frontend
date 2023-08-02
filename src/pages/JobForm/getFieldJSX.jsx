/* eslint-disable no-case-declarations */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  Checkbox,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";

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
};

const addField = (fieldName, formData, setFormData) => {
  if (formData[fieldName]?.EXPANDABLE) {
    const childrenKeys = Object.keys(formData[fieldName]?.CHILDREN);
    const childrenKeysLength = childrenKeys.length;
    const lastKeyIndex = Number(
      childrenKeys[childrenKeysLength - 1]?.split("-")?.pop()
    );
    let newKeyName = null;
    if (childrenKeysLength === 0 || childrenKeysLength === lastKeyIndex) {
      newKeyName = `${fieldName}-${childrenKeysLength + 1}`;
    } else {
      newKeyName = `${fieldName}-${lastKeyIndex + 1}`;
    }
    const subFields = JSON.parse(
      JSON.stringify(formData[fieldName].SUB_FIELDS)
    );
    Object.values(subFields).forEach((subField) => {
      subField.FIELD_ID = `${subField.FIELD_ID}-${newKeyName}`;
    });
    setFormData({
      ...formData,
      [fieldName]: {
        ...formData[fieldName],
        REQUIRED: true,
        CHILDREN: {
          ...formData[fieldName]?.CHILDREN,
          [newKeyName]: subFields,
        },
      },
    });
    return newKeyName;
  }
};

const removeField = (
  childFieldName,
  parentFieldName,
  formData,
  setFormData
) => {
  const copyFormData = JSON.parse(JSON.stringify(formData));
  delete copyFormData[parentFieldName].CHILDREN[childFieldName];
  if (formData[parentFieldName].CHILDREN.length === 0) {
    copyFormData[parentFieldName].REQUIRED = false;
  }
  setFormData(copyFormData);
};

const handleCheckBox = (
  fieldName,
  checked,
  targetFieldName,
  parentFieldName,
  childFieldName,
  formData,
  setFormData
) => {
  const copyFormData = JSON.parse(JSON.stringify(formData));

  const parentField = copyFormData[parentFieldName]?.CHILDREN?.[childFieldName];
  const targetField = parentField?.[targetFieldName];

  if (parentField) {
    parentField[fieldName].VALUE = checked;

    if (targetField) {
      targetField.DISABLED = checked;
      targetField.REQUIRED = !checked;
    }
  }

  setFormData(copyFormData);
};

const getFieldJSX = (
  field,
  handleOnChange,
  formData,
  setFormData,
  keyRef = null
) => {
  switch (field.FIELD_TYPE) {
    case "Textfield":
      return (
        <Grid item xs={12} sm={field.SIZE} key={field?.FIELD_ID}>
          <TextField
            id={field?.FIELD_ID}
            label={field?.FIELD_LABLE}
            onChange={(event) =>
              handleOnChange(
                event.target.value,
                field?.FIELD_NAME,
                field?.PARENT_FIELD_NAME,
                keyRef
              )
            }
            variant="outlined"
            required={field?.REQUIRED}
            disabled={field?.DISABLED}
            fullWidth
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
                field?.PARENT_FIELD_NAME,
                keyRef
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

    case "Date":
      return (
        <Grid item xs={12} sm={field.SIZE} key={field?.FIELD_ID}>
          <InputLabel>{field?.FIELD_LABLE}</InputLabel>
          <DatePicker
            id={field?.FIELD_ID}
            onChange={(value) =>
              handleOnChange(
                value,
                field?.FIELD_NAME,
                field?.PARENT_FIELD_NAME,
                keyRef
              )
            }
            format="yyyy-MM-dd"
            required={field?.REQUIRED}
            disabled={field?.DISABLED}
            sx={{ width: "100%" }}
          />
        </Grid>
      );

    case "Email":
      return (
        <Grid item xs={12} sm={field.SIZE} key={field?.FIELD_ID}>
          <TextField
            id={field?.FIELD_ID}
            label={field?.FIELD_LABLE}
            onChange={(event) =>
              handleOnChange(
                event.target.value,
                field?.FIELD_NAME,
                field?.PARENT_FIELD_NAME,
                keyRef
              )
            }
            variant="outlined"
            type="email"
            required={field?.REQUIRED}
            disabled={field?.DISABLED}
            fullWidth
          />
        </Grid>
      );

    case "Phone Number":
      return (
        <Grid item xs={12} sm={field.SIZE} key={field?.FIELD_ID}>
          <TextField
            id={field?.FIELD_ID}
            label={field?.FIELD_LABLE}
            onChange={(event) =>
              handleOnChange(
                event.target.value,
                field?.FIELD_NAME,
                field?.PARENT_FIELD_NAME,
                keyRef
              )
            }
            variant="outlined"
            type="tel"
            required={field?.REQUIRED}
            disabled={field?.DISABLED}
            fullWidth
          />
        </Grid>
      );

    case "Number":
      return (
        <Grid item xs={12} sm={field?.SIZE} key={field?.FIELD_ID}>
          <TextField
            id={field?.FIELD_ID}
            label={field?.FIELD_LABLE}
            onChange={(event) =>
              handleOnChange(
                event.target.value,
                field?.FIELD_NAME,
                field?.PARENT_FIELD_NAME,
                keyRef
              )
            }
            variant="outlined"
            type="number"
            required={field?.REQUIRED}
            disabled={field?.DISABLED}
            fullWidth
          />
        </Grid>
      );

    case "Checkbox":
      return (
        <Grid item xs={12} sm={field?.SIZE} key={field?.FIELD_ID}>
          <InputLabel>{field?.FIELD_LABLE}</InputLabel>
          <Checkbox
            id={field?.FIELD_ID}
            label={field?.FIELD_LABLE}
            checked={field?.VALUE}
            onChange={(event) => {
              if (field?.PARENT_FIELD_NAME === "Experience") {
                handleCheckBox(
                  field?.FIELD_NAME,
                  event.target.checked,
                  "End Date",
                  field?.PARENT_FIELD_NAME,
                  keyRef,
                  formData,
                  setFormData
                );
              }
            }}
            variant="outlined"
            required={field?.REQUIRED}
            disabled={field?.DISABLED}
          />
        </Grid>
      );

    case "Address":
      return (
        <Grid item xs={12} sm={field?.SIZE} key={field?.FIELD_ID}>
          <Grid container spacing={2}>
            <Grid item xs={12} key={`${field?.FIELD_ID}-label`}>
              <InputLabel style={{ paddingTop: 20 }}>
                {"Enter your address below"}
              </InputLabel>
            </Grid>
            {Object.keys(field?.SUB_FIELDS).map((subField) => {
              return getFieldJSX(
                formData[field?.FIELD_NAME].SUB_FIELDS[subField],
                handleOnChange,
                formData,
                setFormData
              );
            })}
          </Grid>
        </Grid>
      );

    case "Experience":
    case "Education":
      return (
        <Grid item xs={12} sm={field?.SIZE} key={field?.FIELD_ID}>
          <Grid container spacing={2} style={{ padding: 10 }}>
            <Grid item xs={11} style={{ paddingTop: 25 }}>
              <InputLabel>
                {`Click on the plus icon to add ${field?.FIELD_LABLE.toLowerCase()}`}
              </InputLabel>
            </Grid>
            <Grid item xs={1} alignItems="flex-end">
              <AddCircleOutlineOutlined
                style={styles.addIconStyle}
                onClick={() =>
                  addField(field?.FIELD_NAME, formData, setFormData)
                }
              />
            </Grid>
            <Grid item xs={12} key={`${field?.FIELD_LABEL}-children`}>
              <Grid container spacing={2}>
                {Object.keys(formData[field?.FIELD_NAME]?.CHILDREN).map(
                  (childFieldName) => {
                    const childField =
                      formData[field?.FIELD_NAME]?.CHILDREN[childFieldName];
                    return (
                      <Grid item xs={12} key={childFieldName}>
                        <Grid
                          container
                          spacing={2}
                          style={{ paddingBottom: 40 }}
                        >
                          <Grid item xs={12} alignItems="flex-end">
                            <RemoveCircleOutlineRoundedIcon
                              style={styles.removeIconStyle}
                              onClick={() =>
                                removeField(
                                  childFieldName,
                                  field?.FIELD_NAME,
                                  formData,
                                  setFormData
                                )
                              }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container spacing={2}>
                              {Object.keys(childField).map((subFieldName) => {
                                return getFieldJSX(
                                  childField[subFieldName],
                                  handleOnChange,
                                  formData,
                                  setFormData,
                                  childFieldName
                                );
                              })}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  }
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );

    default:
      return null;
  }
};

export default getFieldJSX;
