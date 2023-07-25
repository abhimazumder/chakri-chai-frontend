/* eslint-disable no-unused-vars */
import {
  Box,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import { AddCircleOutlineOutlined } from "@mui/icons-material";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import EuroRoundedIcon from "@mui/icons-material/EuroRounded";
import CurrencyYenRoundedIcon from "@mui/icons-material/CurrencyYenRounded";
import CurrencyPoundRoundedIcon from "@mui/icons-material/CurrencyPoundRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";

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

const createLocationObject = (field, setFormData) => {
  const location = {};
  const copyField = { ...field };

  Object.values(copyField?.SUB_FIELDS).forEach((subField) => {
    location[subField?.FIELD_NAME] = subField?.VALUE;
    subField.VALUE = "";
  });

  const locationArray = copyField.VALUE;

  if (locationArray.length === 0) {
    location.ID = 0;
  } else {
    const lastElement = locationArray.slice(-1);
    location.ID = lastElement[0]?.ID + 1;
  }

  locationArray.push(location);
  copyField.VALUE = locationArray;

  setFormData((prevFormData) => ({
    ...prevFormData,
    [field.FIELD_NAME]: copyField,
  }));
};

const removeLocationChip = (id, field, setFormData) => {
  const copyField = { ...field };

  const newLocationArray = copyField?.VALUE.filter(
    (location) => location.ID !== id
  );

  copyField.VALUE = newLocationArray;

  setFormData((prevFormData) => ({
    ...prevFormData,
    [field.FIELD_NAME]: copyField,
  }));
};

const generateLocationChip = (location, field, setFormData) => {
  return (
    <Grid item xs={"auto"} key={location.ID}>
      <Chip
        size="medium"
        label={`${location.Country} - ${location.City}`}
        onDelete={() => removeLocationChip(location.ID, field, setFormData)}
      />
    </Grid>
  );
};

const removeExperienceChip = (field, setFormData) => {
  setFormData((prevFormData) => ({
    ...prevFormData,
    [field.FIELD_NAME]: {
      ...field,
      VALUE: {},
    },
  }));
};

const createExperienceObject = (field, setFormData) => {
  let newValue;
  const rangeType = field?.SUB_FIELDS["Range Type"].VALUE;
  const rangeValue = field?.SUB_FIELDS["Range Value"].VALUE;
  const unit = field?.SUB_FIELDS["Unit"].VALUE;

  if (rangeType === "" || rangeValue === "" || unit === "") return;

  if (rangeType === "Absolute") {
    newValue = {
      ...field.VALUE,
      RANGE: {
        [rangeType.toUpperCase()]: rangeValue,
      },
      UNIT: unit,
    };
  } else {
    newValue = {
      ...field.VALUE,
      RANGE: {
        ...field?.VALUE?.RANGE,
        [rangeType.toUpperCase()]: rangeValue,
      },
      UNIT: unit,
    };
    delete newValue?.RANGE?.ABSOLUTE;
  }
  setFormData((prevFormData) => ({
    ...prevFormData,
    [field.FIELD_NAME]: {
      ...field,
      VALUE: newValue,
    },
  }));
};

const removeCompensationChip = (field, setFormData) => {
  setFormData((prevFormData) => ({
    ...prevFormData,
    [field.FIELD_NAME]: {
      ...field,
      VALUE: {},
    },
  }));
};

const createCompensationObject = (field, setFormData) => {
  let newValue;
  const rangeType = field?.SUB_FIELDS["Range Type"].VALUE;
  const rangeValue = field?.SUB_FIELDS["Range Value"].VALUE;
  const currency = field?.SUB_FIELDS["Currency"].VALUE;

  if (rangeType === "" || rangeValue === "" || currency === "") return;

  if (rangeType === "Absolute") {
    newValue = {
      ...field.VALUE,
      RANGE: {
        [rangeType.toUpperCase()]: rangeValue,
      },
      CURRENCY: currency,
    };
  } else {
    newValue = {
      ...field.VALUE,
      RANGE: {
        ...field?.VALUE?.RANGE,
        [rangeType.toUpperCase()]: rangeValue,
      },
      CURRENCY: currency,
    };
    delete newValue?.RANGE?.ABSOLUTE;
  }
  setFormData((prevFormData) => ({
    ...prevFormData,
    [field.FIELD_NAME]: {
      ...field,
      VALUE: newValue,
    },
  }));
};

const removeSectionObject = (childFieldName, field, setFormData) => {
  const copyChildren = { ...field.CHILDREN };
  delete copyChildren[childFieldName];
  setFormData((prevFormData) => ({
    ...prevFormData,
    [field.FIELD_NAME]: {
      ...field,
      CHILDREN: copyChildren,
    },
  }));
};


const createSectionObject = (field, setFormData) => {
  if (field.EXPANDABLE) {
    const childrenKeys = Object.keys(field.CHILDREN);
    const lastKey = childrenKeys[childrenKeys.length - 1];
    let newKey;

    if (!lastKey) newKey = `${field.FIELD_NAME}-1`;
    else newKey = `${field.FIELD_NAME}-${Number(lastKey.split("-").pop()) + 1}`;

    const newVal = JSON.parse(JSON.stringify(field.SUB_FIELDS));

    Object.values(newVal).forEach((subField) => {
      subField.FIELD_ID = `${subField.FIELD_ID}-${newKey}`;
    });

    setFormData((prevFormData) => ({
      ...prevFormData,
      [field.FIELD_NAME]: {
        ...field,
        CHILDREN: {
          ...field.CHILDREN,
          [newKey]: newVal,
        },
      },
    }));
  }
};

const getFieldJSX = (
  field,
  handleOnChange,
  formData,
  setFormData,
  keyRef = null
) => {
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
    SUB_FIELDS,
    OPTIONS,
    CHILDREN,
    ERROR,
    VALUE,
  } = field;

  switch (FIELD_TYPE) {
    case "Textfield":
      return (
        <Grid item xs={12} sm={SIZE} key={FIELD_ID}>
          <TextField
            id={FIELD_ID}
            label={FIELD_LABEL}
            value={VALUE}
            onChange={(event) =>
              handleOnChange(
                event.target.value,
                FIELD_NAME,
                PARENT_FIELD_NAME,
                keyRef
              )
            }
            variant="outlined"
            required={REQUIRED}
            disabled={DISABLED}
            fullWidth
          />
        </Grid>
      );

    case "Dropdown":
      return (
        <Grid item xs={12} sm={SIZE} key={FIELD_ID}>
          <FormControl fullWidth>
            <InputLabel id={`${FIELD_ID}-label`}>{FIELD_LABEL}</InputLabel>
            <Select
              id={FIELD_ID}
              label={FIELD_LABEL}
              labelId={`${FIELD_ID}-label`}
              value={VALUE}
              onChange={(event) =>
                handleOnChange(
                  event.target.value,
                  FIELD_NAME,
                  PARENT_FIELD_NAME,
                  keyRef
                )
              }
              variant="outlined"
              required={REQUIRED}
              disabled={DISABLED}
              fullWidth
            >
              {OPTIONS.map((option) => (
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
          </FormControl>
        </Grid>
      );

    case "Date":
      return (
        <Grid item xs={12} sm={SIZE} key={FIELD_ID}>
          <InputLabel>{FIELD_LABEL}</InputLabel>
          <DatePicker
            id={FIELD_ID}
            onChange={(value) =>
              handleOnChange(
                value,
                FIELD_NAME,
                PARENT_FIELD_NAME,
                keyRef
              )
            }
            format="yyyy-MM-dd"
            required={REQUIRED}
            disabled={DISABLED}
            sx={{ width: "100%" }}
          />
        </Grid>
      );

    case "Number":
      return (
        <Grid item xs={12} sm={SIZE} key={FIELD_ID}>
          <TextField
            id={FIELD_ID}
            label={FIELD_LABEL}
            onChange={(event) =>
              handleOnChange(
                event.target.value,
                FIELD_NAME,
                PARENT_FIELD_NAME,
                keyRef
              )
            }
            variant="outlined"
            type="number"
            required={REQUIRED}
            disabled={DISABLED}
            fullWidth
          />
        </Grid>
      );

    case "Textarea":
      return (
        <Grid item xs={12} sm={SIZE} key={FIELD_ID}>
          <TextField
            id={FIELD_ID}
            label={FIELD_LABEL}
            value={VALUE}
            onChange={(event) =>
              handleOnChange(
                event.target.value,
                FIELD_NAME,
                PARENT_FIELD_NAME,
                keyRef
              )
            }
            variant="outlined"
            required={REQUIRED}
            disabled={DISABLED}
            fullWidth
            multiline
            minRows={5}
            maxRows={10}
          />
        </Grid>
      );

    case "Job Locations":
      return (
        <Grid item xs={12} sm={SIZE} key={FIELD_ID}>
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
                    onClick={() => createLocationObject(field, setFormData)}
                  />
                </Grid>
              </Grid>
            </Grid>
            {Object.values(SUB_FIELDS).map((field) =>
              getFieldJSX(field, handleOnChange, formData, setFormData)
            )}
            <Grid item xs={12}>
              <Grid container alignItems="left" spacing={1}>
                {VALUE.map((location) =>
                  generateLocationChip(location, field, setFormData)
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );

    case "Required Experience":
      return (
        <Grid item xs={12} sm={SIZE} key={FIELD_ID}>
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
                    onClick={() => createExperienceObject(field, setFormData)}
                  />
                </Grid>
              </Grid>
            </Grid>
            {Object.values(SUB_FIELDS).map((field) => {
              return getFieldJSX(field, handleOnChange, formData, setFormData);
            })}
            <Grid item xs={12}>
              {Object.keys(VALUE).length !== 0 && (
                <Chip
                  size="large"
                  icon={<WorkRoundedIcon />}
                  label={
                    Object.keys(VALUE?.RANGE).length === 2
                      ? `${VALUE?.RANGE?.MINIMUM} - ${VALUE?.RANGE?.MAXIMUM} ${VALUE.UNIT}`
                      : VALUE?.RANGE?.MINIMUM
                      ? `> ${VALUE?.RANGE?.MINIMUM} ${VALUE.UNIT}`
                      : VALUE?.RANGE?.MAXIMUM
                      ? `< ${VALUE?.RANGE?.MAXIMUM} ${VALUE.UNIT}`
                      : VALUE?.RANGE?.ABSOLUTE
                      ? `${VALUE?.RANGE?.ABSOLUTE} ${VALUE.UNIT}`
                      : ""
                  }
                  onDelete={() => removeExperienceChip(field, setFormData)}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      );

    case "Compensation":
      return (
        <Grid item xs={12} sm={SIZE} key={FIELD_ID}>
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
                    onClick={() => createCompensationObject(field, setFormData)}
                  />
                </Grid>
              </Grid>
            </Grid>
            {Object.values(SUB_FIELDS).map((field) => {
              return getFieldJSX(field, handleOnChange, formData, setFormData);
            })}
            <Grid item xs={12}>
              {Object.keys(VALUE).length !== 0 && (
                <Chip
                  size="large"
                  icon={
                    VALUE?.CURRENCY.toUpperCase() === "RUPEE" ? (
                      <CurrencyRupeeRoundedIcon />
                    ) : VALUE?.CURRENCY.toUpperCase() === "DOLLAR" ? (
                      <AttachMoneyRoundedIcon />
                    ) : VALUE?.CURRENCY.toUpperCase() === "EURO" ? (
                      <EuroRoundedIcon />
                    ) : VALUE?.CURRENCY.toUpperCase() === "YEN/YUAN" ? (
                      <CurrencyYenRoundedIcon />
                    ) : VALUE?.CURRENCY.toUpperCase() === "POUND" ? (
                      <CurrencyPoundRoundedIcon />
                    ) : (
                      <SavingsRoundedIcon />
                    )
                  }
                  label={
                    Object.keys(VALUE?.RANGE).length === 2
                      ? `${VALUE?.RANGE?.MINIMUM} - ${VALUE?.RANGE?.MAXIMUM}`
                      : VALUE?.RANGE?.MINIMUM
                      ? `> ${VALUE?.RANGE?.MINIMUM}`
                      : VALUE?.RANGE?.MAXIMUM
                      ? `< ${VALUE?.RANGE?.MAXIMUM}`
                      : VALUE?.RANGE?.ABSOLUTE
                      ? `${VALUE?.RANGE?.ABSOLUTE}`
                      : ""
                  }
                  onDelete={() => removeCompensationChip(field, setFormData)}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      );

    case "Description":
      return (
        <Grid item xs={12} sm={SIZE} key={FIELD_ID}>
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
                    onClick={() => createSectionObject(field, setFormData)}
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
                            onClick={() =>
                              removeSectionObject(
                                childFieldName,
                                field,
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
                })}
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
