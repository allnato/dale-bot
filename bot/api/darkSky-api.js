/**
 * @module
 * A DarkSky API that returns the weather result in JSON format.
 */
const axios = require('axios');
const key = require('./../config/config').darkskyKey;
const apiBaseURL = 'https://api.darksky.net/forecast/' + key;

/**
 * Returns a Promise containg the JSON result of the darkSky API.
 * @param {String} lat Latitude  
 * @param {String} long Longitude
 */
const getForecast = async(lat, long) => {
    let url = `${apiBaseURL}/${lat},${long}?units=si`;
    let jsonRes = await axios.get(url, {responseType: 'json'});

    if (jsonRes.status == 400) {
        throw new Error('DarkSky Bad Request: Check API key and Input params.');
    } else if (jsonRes.status == 403) {
        throw new Error('Invalid API Key');
    } else if (jsonRes.status == 200) {
        return jsonRes.data;
    } else {
        throw new Error('Error connecting to Dark Sky API');
    }
};

module.exports = getForecast;