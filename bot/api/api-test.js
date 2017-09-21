const {getLatLong} = require('./gmapsGeocoding-api.js');

getLatLong('Manila, Philippines')
    .then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });