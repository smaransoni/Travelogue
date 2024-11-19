// const API_KEY = 'AIzaSyDgLmMpKCzveJf1_yuA0fUzzhyOWRChvZA';
// const axios = require('axios');
const HttpError = require('../models/http-error');

async function getCoordsForAddress(address) {
  return {
    lat: 40.7484405,
    lng: -73.9882393,
  };

  //   const response = await axios.get(
  //     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //       address
  //     )}&key=${API_KEY}`
  //   );
  //   const data = response.data;

  //   if (!data || data.status === 'ZERO_RESULTS') {
  //     const errr = new HttpError(
  //       'Could not find the location for the specified address',
  //       422
  //     );
  //     throw error;
  //   }
  //   console.log(data);
  //   const coordinates = data.results[0].geometry.location;

  //   return coordinates;
}

module.exports = getCoordsForAddress;
