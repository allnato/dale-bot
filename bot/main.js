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