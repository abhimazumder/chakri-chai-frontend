/* eslint-disable no-case-declarations */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React from "react";
import { Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AddCircleOutlineOutlined } from "@mui/icons-material";

const style = {
    iconStyle: {
        paddingTop: 20,
        color: "grey",
        fontSize: "2rem",
        cursor: "pointer",
    },
};

const addField = (fieldName, formData, setFormData) => {
    if (formData[fieldName]?.EXPANDABLE) {
      const childrenKeys = Object.keys(formData[fieldName]?.CHILDREN);
      const childrenKeysLength = childrenKeys.length;
      const lastKeyIndex = Number(childrenKeys[childrenKeysLength - 1]?.split('-')?.pop());
  
      if (childrenKeysLength === 0 || childrenKeysLength === lastKeyIndex) {
        const newKeyName = `${fieldName}-${childrenKeysLength + 1}`;
        setFormData({
          ...formData,
          [fieldName]: {
            ...formData[fieldName],
            REQUIRED: true,
            CHILDREN: {
              ...formData[fieldName]?.CHILDREN,
              [newKeyName]: formData[fieldName]?.SUB_FIELDS,
            },
          },
        });
        return newKeyName;
      }
    }
  };  

const getFieldJSX = (field, handleOnChange, formData, setFormData, keyRef = null) => {
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
                        error={field?.ERROR}
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
                        error={field?.ERROR}
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
                        error={field?.ERROR}
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
                        error={field?.ERROR}
                        fullWidth
                        inputProps={{
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            title: "Enter a valid email address",
                        }}
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
                        error={field?.ERROR}
                        fullWidth
                        InputProps={{
                            maxLength: 10,
                        }}
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
                        error={field?.ERROR}
                        fullWidth
                        inputProps={{
                            inputMode: "numeric",
                        }}
                    />
                </Grid>
            );

        case "Address":
            return (
                <>
                    <Grid item xs={12} sm={field?.SIZE} key={field?.FIELD_ID}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputLabel style={{ paddingTop: 20 }}>
                                    Enter your address below
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
                </>
            );

        case "Education":
            const addEducationField = (fieldName) => {
                const childFieldKeyRef = addField(fieldName, formData, setFormData);
                console.log(childFieldKeyRef)
            };

            return (
                <>
                    <Grid item xs={12} sm={field?.SIZE} key={field?.FIELD_ID}>
                        <Grid container spacing={2}>
                            <Grid item xs={11}>
                                <InputLabel style={{ paddingTop: 20 }}>
                                    Click on the plus icon to add education
                                </InputLabel>
                            </Grid>
                            <Grid item xs={1} alignItems="flex-end">
                                <AddCircleOutlineOutlined
                                    style={style.iconStyle}
                                    onClick={() => addEducationField(field?.FIELD_NAME)}
                                />
                            </Grid>
                            {Object.keys(formData[field?.FIELD_NAME]?.CHILDREN).map(
                                (childFieldName) => {
                                    const childField =
                                        formData[field?.FIELD_NAME]?.CHILDREN[childFieldName];
                                    return (
                                        <>
                                            {Object.keys(childField).map((subFieldName) => {
                                                return getFieldJSX(
                                                    childField[subFieldName],
                                                    handleOnChange,
                                                    formData,
                                                    setFormData,
                                                    Object.keys(field.CHILDREN).pop()
                                                );
                                            })}
                                        </>
                                    );
                                }
                            )}
                        </Grid>
                    </Grid>
                </>
            );

        default:
            return null;
    }
};

export default getFieldJSX;
