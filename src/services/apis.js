/* eslint-disable no-unused-vars */
// import axios from 'axios';

// export const fetchCountryListAlt = async () => {
//   try {
//     const username = 'abhishek2806'; // Replace with your Geonames username
//     const url = `http://api.geonames.org/countryInfoJSON?username=${username}`;

//     const response = await axios.get(url);
//     const countries = response.data.geonames;

//     const modifiedCountryList = countries.map((country) => ({
//       VALUE: country.countryName,
//       ID: country.countryCode,
//       DISABLED: false
//     }));

//     return modifiedCountryList;
//   } catch (error) {
//     console.error('Error fetching country list:', error);
//     return [];
//   }
// };

// export const fetchStatesByCountryAlt = async (countryName) => {
//   const otherValue = {
//     VALUE: 'Other',
//     ID: 'Others',
//     DISABLED: false,
//   };

//   try {
//     const username = 'abhishek2806'; // Replace with your Geonames username
//     const encodedCountryName = encodeURIComponent(countryName);
//     const url = `http://api.geonames.org/searchJSON?username=${username}&country=${encodedCountryName}&featureCode=ADM1`;

//     const response = await axios.get(url);
//     const states = response.data.geonames;

//     if (!states || states.length === 0) {
//       return [otherValue];
//     }

//     const transformedStates = states.map((state) => ({
//       VALUE: state.adminName1,
//       ID: state.adminCode1,
//       DISABLED: false,
//     }));

//     transformedStates.push(otherValue);

//     return transformedStates;
//   } catch (error) {
//     console.error('Error fetching states:', error);
//     return [otherValue];
//   }
// };

// ------------------------------------------------------------------------------------------------------------- //
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
