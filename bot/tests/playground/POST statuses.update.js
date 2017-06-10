const client = require('./../../api/twitter-api');
const logger = require('./../../utils/logger');

var tweet = 'Test tweet';

client.post('statuses/update', {status: tweet})
    .then(() => {
        logger.info('Added a new tweet');
    }, err => {
        logger.error('Error Tweeting', {error: err});
    });