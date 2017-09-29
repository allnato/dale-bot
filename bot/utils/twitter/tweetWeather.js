/**
 * @module
 * Tweet the current weather.
 */
const {postStatus} = require('./../../api/twitter-api');
const weather = require('./../weather/getWeather');
const logger = require('./../logger');
const moment = require('moment-timezone');

/**
 * Tweets the current weather of the given address.
 * @param {String} address Address input, default is `Manila, Philippines' 
 */
const tweetWeather = async(address='Manila, Philippines') => {
    let curTime = moment.tz('Asia/Manila').format('hh:mm A');
    try {
        
        let curForecast = await weather.getCurrForecast(address);
        let data = {
            status: curForecast.currently.summary,
            temp: curForecast.currently.temperature + ' \u00B0' + 'C',
            precip: (curForecast.currently.precipProbability * 100) + '%',
            humid: (curForecast.currently.humidity * 100) + '%'
        }
        
        let tweetHead = `As of ${curTime} in ${address}\nThere will be ${curForecast.hourly.summary}\n\n`;
        let tweetBody = `Weather Status: ${data.status}\nTemperature: ${data.temp}\nPrecipitation: ${data.precip}\nHumidity: ${data.humid}`;
        // Post Tweet head then reply body.

        // Post `Tweet Head`
        let tweetPost = await postStatus({status: tweetHead});
        logger.info('Tweeted a weather header update', {tweet: tweetPost.text});
        // Get `Tweet Head` post id.
        let reply = {
            in_reply_to_status_id: tweetPost.id_str,
            status: `@${tweetPost.user.screen_name}\n${tweetBody}`
        }
        // Post reply from `Tweet Head`
        let replyPost = await postStatus(reply);
        logger.info('Tweeted a weather body update', {tweet: replyPost.text});        

    } catch (err) {
        logger.error('Error tweeting current weather forecast', {error: err});
    }
};

// tweetWeather();

module.exports = tweetWeather;