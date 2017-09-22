const axios = require('axios');
const apiBaseURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

/**
 * Returns a Promise containing the longitude and latitude of the
 * given address.
 * @param {String} address 
 */
const getGeocode = async(address) => {
    let url = apiBaseURL + encodeURIComponent(address);
    let jsonRes = await axios.get(url, {responseType: 'json'});

    if (jsonRes.status != 200 || jsonRes.data.status != 'OK') {
        throw new Error('Error: Could not find address');
    }

    return jsonRes.data
};

module.exports = getGeocode; 