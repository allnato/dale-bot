/**
 * Syllable Counter bot.
 */
const twitter = require('./api/twitter-api');
const reddit = require('./api/reddit-api');
const logger = require('./utils/logger');
const syllableRequest = require('./utils/twitter/syllableRequest');

/**
 * Set all API variables to null.
 */
let twitterStream = null;
let twitterUser = null;
let redditUser = null;

/**
 * Verify Credentials for both twitter and reddit.
 * If both authentication are verified, invoke the main() function.
 */
console.log('AUTHENTICATING APIs...');
Promise.all([twitter.verifyCredentials(), reddit.verifyCredentials()])
    .then(res => {
        twitterUser = res[0];
        redditUser = res[1];
        logger.info(`Successfully authenticated in twitter as "${twitterUser.screen_name}"`);
        logger.info(`Successfully authenticated in reddit as "${redditUser.name}"`);
        // Twitter stream conenction
        twitterStream = twitter.getUserStream();
        main();        
    }).catch( err => {
        logger.error('Authentication failed: Invalid credentials.', {error: err});
        logger.error(err);
    });


// Main function
function main() {
    logger.info('STARTING main function.');
    /** 
     * Listen reply tweets to return a syllable request.
     */
    twitterStream.on('data', res => {
        let reply_to_name = res.in_reply_to_screen_name;
        let reply_to_status = res.in_reply_to_status_id;

        if (reply_to_name === twitterUser.screen_name && reply_to_status == null) {
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