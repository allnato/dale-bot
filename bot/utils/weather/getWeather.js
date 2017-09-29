/**
 * @module
 * Fetches the weather data of the given address via DarkSky API.
 */
const logger = require('./../logger');
const getGeocode = require('./../../api/gmapsGeocoding-api');
const getForecast = require('./../../api/darkSky-api');

/**
 * Returns a Promise containing the longitude and latitude of the address.
 * @param {String} address Adress input
 * @returns {Promise<Object>} Returns a formatted address, longitude, and latitude
 */
const getLatLong = async(address) => {
    let geocode = await getGeocode(address);
    // Take the first value
    let res = geocode.results[0];

    return {
        'formattedAddress': res.formatted_address,
        'longitude': res.geometry.location.lng,
        'latitude': res.geometry.location.lat
    };
}

/**
 * Fetches the current weather forecast of the given address.
 * @param {*} address Address input
 * @returns {Promise<Object>} Returns the current hour and daily forecast.
 */
const getCurrForecast = async(address) => {
    let coord = await getLatLong(address);
    let weather = await getForecast(coord.latitude, coord.longitude);

    let forecast = {
        'currently': weather.currently,
        'hourly': {
            'summary': weather.hourly.summary,
            'data': weather.hourly.data[0]
        },
        'daily': {
            'summary': weather.daily.summary,
            'data': weather.daily.data[0]
        }
    }

    return forecast;

};

// Debugging purposes
// getCurrForecast('Manila, Philippines')
//     .then(res => {
//         console.log(res);
//     }).catch(err => {
//         console.log(err);
//     });

module.exports = {
    getCurrForecast
};