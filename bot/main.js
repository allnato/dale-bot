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

var tweet = 'Hello world \uD83C\uDF0F \nThis is posted via the twitter API.';
client.post('statuses/update', {status: tweet})
    .then(() => {
        logger.info('Added a new tweet');
    }, err => {
        logger.error('Error Tweeting', {error: err});
    });