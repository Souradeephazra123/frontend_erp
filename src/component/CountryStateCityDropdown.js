// src/components/CountryStateCityDropdown.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryStateCityDropdown = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const apiKey = 'dFhVY0dLQnU3ckdyNVNsb1VsMWZTenBLd1JIOUlZQ3NIV282b0RkUA==';
  const apiUrl = 'https://api.countrystatecity.in/v1';

  useEffect(() => {
    // Fetch countries
    axios
      .get(`${apiUrl}/countries`, {
        headers: { 'X-CSCAPI-KEY': apiKey },
      })
      .then((response) => setCountries(response.data))
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      // Fetch states when a country is selected
      axios
        .get(`${apiUrl}/countries/${selectedCountry}/states`, {
          headers: { 'X-CSCAPI-KEY': apiKey },
        })
        .then((response) => setStates(response.data))
        .catch((error) => console.error('Error fetching states:', error));
    } else {
      setStates([]);
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      // Fetch cities when a state is selected
      axios
        .get(`${apiUrl}/countries/${selectedCountry}/states/${selectedState}/cities`, {
          headers: { 'X-CSCAPI-KEY': apiKey },
        })
        .then((response) => setCities(response.data))
        .catch((error) => console.error('Error fetching cities:', error));
    } else {
      setCities([]);
    }
  }, [selectedState]);

  return (
    <div>
      <div>
        <label>Country:</label>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.iso2} value={country.iso2}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>State:</label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.iso2} value={state.iso2}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>City:</label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CountryStateCityDropdown;
