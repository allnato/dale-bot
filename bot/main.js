/**
 * Syllable Counter bot.
 */
const twitter = require('./api/twitter-api');
const logger = require('./utils/logger');
const countSyllables = require('./utils/lang/countSyllables');
const filterMentions = require('./utils/twitter/filterMentions');

// Twitter user stream connection
const stream = twitter.getUserStream();

let screen_name = null;
// Verify Authentication
twitter.verifyCredentials()
    .then((res) => {
        screen_name = res.screen_name;
        logger.info(`Successfully Authenticated as "${screen_name}"`);
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

        if (reply_to_name === screen_name && reply_to_status == null) {
            let reply_from = res.user.screen_name;
            replySyllables(res.id_str,reply_from, res.text);        
        }        
    });
}

function replySyllables(status_id, screen_name, text) {
    text = filterMentions(text);
    let syllables = countSyllables(text);
    let message = `@${screen_name}\nSyllable Count: ${syllables.count}\nPhonemes: ${syllables.phonemes}`;

    let params = {
        in_reply_to_status_id: status_id, 
        status: message
    };

    twitter.postStatus(params)
        .then((res) => {
            logger.info('Successfully replied to a syllable request', {tweet: res.text});
        }, err => {
            logger.error('Error replying to a syllable request', {error: err});
        });
}