/**
 * Syllable Counter bot.
 */
const twitter = require('./api/twitter-api');
const logger = require('./utils/logger');
const syllableRequest = require('./utils/twitter/syllableRequest');

// Twitter user stream connection
const stream = twitter.getUserStream();


let user = null;
// Verify Authentication
twitter.verifyCredentials()
    .then((res) => {
        user = res;
        logger.info(`Successfully Authenticated as "${user.screen_name}"`);
        main();
    }, err => {
        logger.error('Authentication failed: Invalid credentials.', {error: err});
        process.exit(1);
    });

// Main function
function main() {
    /** 
     * Listen reply tweets to return a syllable request.
     */
    stream.on('data', res => {
        let reply_to_name = res.in_reply_to_screen_name;
        let reply_to_status = res.in_reply_to_status_id;

        if (reply_to_name === user.screen_name && reply_to_status == null) {
            let reply_from = res.user.screen_name;
            syllableRequest(res.id_str, reply_from, res.text)
                .then((res) => {
                    logger.info('Successfully replied to a syllable request.', {tweet: res.text});
                }, err => {
                    logger.error('Error replying to a syllable request.', {error: err});
                });        
        }        
    });
}