const client = require('./api/twitter-api');
const logger = require('./utils/logger');
const moment = require('moment-timezone');

// Verify Authentication
client.get('account/verify_credentials',{})
    .then(() => {
        logger.info('Successfully Authenticated.');
    }, err => {
        logger.error('Authentication failed: Invalid credentials.', {error: err});
        process.exit(1);
    });



var tweet = () => {
    let curDateTime = moment.tz('Asia/Manila').format('MM/DD/YYYY hh:mm:ss A [GMT]Z');
    let message = `This is a scheduled tweet. \n\n${curDateTime}`;
    client.post('statuses/update', {status: message})
        .then((res) => {
            logger.info('Added a new tweet', {tweet: res.text});
        }, err => {
            logger.error('Error Tweeting', {error: err});
        });
};

setInterval(tweet, 1000*60*60*6);