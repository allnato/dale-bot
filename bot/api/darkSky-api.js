const axios = require('axios');
const key = require('./../config/config').darkskyKey;
const apiBaseURL = 'https://api.darksky.net/forecast/' + key;

const getForecast = async(lat, long) => {
    let url = `${apiBaseURL}/${lat},${long}?units=si`;
    let jsonRes = await axios.get(url, {responseType: 'json'});

    if (jsonRes.status == 400) {
        throw new Error(jsonRes.data.error);
    } else if (jsonRes.status == 403) {
        throw new Error('Invalid API Key');
    } else if (jsonRes.status == 200) {
        return jsonRes.data.currently;
    } else {
        throw new Error('Error connecting to Dark Sky API');
    }
};

module.exports = {
    getForecast
};