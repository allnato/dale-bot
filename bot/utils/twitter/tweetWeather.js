/**
 * @module
 * Tweet the current weather.
 */
const {postStatus} = require('./../../api/twitter-api');
const weather = require('./../weather/getWeather');
const logger = require('./../logger');
const moment = require('moment-timezone');

const tweetWeather = async(address='Manila, Philippines') => {
    let curTime = moment.tz('Asia/Manila').format('hh:mm A');
    try {
        
        let curForecast = await weather.getCurrForecast(address);
        let data = {
            status: curForecast.currently.summary,
            temp: curForecast.currently.temperature,
            precip: (curForecast.currently.precipProbability * 100) + '%',
            humid: (curForecast.currently.humidity * 100) + '%'
        }
        
        let tweetHead = `As of ${curTime} in ${address}\nThere will be ${curForecast.hourly.summary}\n\n`;
        let tweetBody = `Weather Status: ${data.status}\nTemperature: ${data.temp}\nPrecipitation: ${data.precip}\nHumidity: ${data.humid}`;
        // TODO: Find a workaround to post a tweet status over 140 characters.
        let tweetPost = await postStatus({status: tweetHead});
        logger.info('Tweeted a new weather update', {tweet: tweetPost.text});

    } catch (err) {
        logger.error('Error tweeting current weather forecast', {error: err});
    }
};

tweetWeather();

module.exports = tweetWeather;