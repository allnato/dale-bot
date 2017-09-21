const axios = require('axios');
const key = require('./../config/config').darkskyKey;
const apiBaseURL = 'https://api.darksky.net/forecast/' + key;

const getForecast = async(lat, long) => {

};

module.exports = {
    getForecast
};