const client = require('./api/twitter-api');
const logger = require('./utils/logger');

// Verify Authentication
client.get('account/verify_credentials',{})
    .then(() => {
        logger.info('Successfully Authenticated.');
    }, err => {
        logger.error('Authentication failed: Invalid credentials.', {error: err});
        process.exit(1);
    });



var tweet = () => {
    let curDateTime = new Date(Date.now());
    let message = `This is a scheduled tweet. \n\n${curDateTime}`;
    client.post('statuses/update', {status: message})
        .then((res) => {
            logger.info('Added a new tweet', {tweet: res.text});
        }, err => {
            logger.error('Error Tweeting', {error: err});
        });
};

setInterval(tweet, 1000*60*3);