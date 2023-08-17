import { Country, State } from "country-state-city";
import CryptoJS from "crypto-js";

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

const baseURL = "https://kkidqp1w6l.execute-api.ap-south-1.amazonaws.com/dev";

const instance = axios.create({
  baseURL,
});

export const userLogin = async (data) => {
  Object.keys(data).forEach((key) => {
    data[key] = CryptoJS.AES.encrypt(
      data[key],
      import.meta.env.VITE_CRYPTO_SECRET_KEY
    ).toString();
  });
  try {
    const res = await instance.post("/auth/login", data);
    return res;
  } catch (err) {
    return err.response;
  }
};

export const createJob = async (data) => {
  const res = await instance.post("/jobs/createjob", data);
  return res;
};

export const getJob = async (data) => {
  const res = await instance.post("/jobs/getjob", data);
  return res;
};

export const jobList = async () => {
  const res = await instance.post("/jobs/joblist");
  return res;
};
