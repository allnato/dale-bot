/**
 * Syllable Counter bot and Scheduled Reddit poster.
 */
const twitter = require('./api/twitter-api');
const reddit = require('./api/reddit-api');
const logger = require('./utils/logger');
const later = require('later');
const syllableRequest = require('./utils/twitter/syllableRequest');
const fetchTopContents = require('./utils/reddit/fetchTopContents');
/**
 * Set all API variables to null.
 */
let twitterStream = null;
let twitterUser = null;
let redditUser = null;

/**
 * Verify Credentials for both twitter and reddit.
 * If both authentication are verified, invoke the main() function.
 * Otherwise, the process will terminate naturally.
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

    /**
     * Tweet tailored reddit post every 3 hours GMT +800
     */
    let phSched = {
        schedules: [{h: [1, 4, 7, 10, 13, 16, 19, 22]}] // Every 3 Hours (GMT +800)
    };

    later.setInterval(() => {
        fetchTopContents().then(res => {
            let url = 'www.reddit.com';
            for (let content of res) {
                let permalink = url + content.permalink;
                let twitterStatus = `${content.title}\n${permalink}\nsource: ${content.subreddit_name_prefixed}`;
                twitter.postStatus({status: twitterStatus}).then(res => {
                    logger.info('Successfully posted a reddit post.', {tweet: res.text});
                }).catch(err => {
                    logger.error('Error posting a reddit post.', {error: err});  
                });
            }
        }).catch(err => {
            logger.error('Error fetching top reddit contents.', {error: err});
        });
    }, phSched);
    
    logger.info('Main function now RUNNING...');
}