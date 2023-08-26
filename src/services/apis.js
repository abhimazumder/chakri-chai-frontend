/* eslint-disable no-unused-vars */
import { Country, State } from "country-state-city";

export const fetchCountryList = () => {
  const countries = Country.getAllCountries();
  const modifiedCountryList = countries.map((country) => ({
    VALUE: country.name,
    ID: country.isoCode,
    DISABLED: false,
  }));
  return modifiedCountryList;
};

export const fetchStatesByCountry = (countryName) => {
  const otherValue = {
    VALUE: "Other",
    ID: "Others",
    DISABLED: false,
  };
  const countries = Country.getAllCountries();
  const country = countries.find((c) => c.name === countryName);

  if (!country) {
    return [otherValue];
  }

  const states = State.getStatesOfCountry(country.isoCode);

  const modifiedStatesList = states.map((state) => ({
    VALUE: state.name,
    ID: state.isoCode,
    DISABLED: false,
  }));

  modifiedStatesList.push(otherValue);
  return modifiedStatesList;
};

//-------------------- Lambda Function APIs --------------------//

import axios from "axios";

const baseURL = "https://ucrn5b4nrj.execute-api.ap-south-1.amazonaws.com/dev";

export const instance = axios.create({
  baseURL,
});

export const refreshInstance = axios.create({
  baseURL,
});
