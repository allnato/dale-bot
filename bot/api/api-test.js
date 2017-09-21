const {getLatLong} = require('./gmapsGeocoding-api.js');
const {getForecast} = require('./darkSky-api');


const getWeather = async(address) => {
    try {
        let geocode = await getLatLong(address);
        let forecast = await getForecast(geocode.latitude, geocode.longitude);

        console.log(forecast);
    } catch (err) {
        console.log(err);
    }
}

getWeather('Taft Avenue, Manila, Philippines');