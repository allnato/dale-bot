const client = require('./api/twitter-api');
const logger = require('./utils/logger');
const countSyllables = require('./utils/lang/countSyllables');

const stream = client.stream('user', {replies: 'all'});
let screen_name = null;


// Verify Authentication
client.get('account/verify_credentials',{})
    .then((res) => {
        screen_name = res.screen_name;
        logger.info(`Successfully Authenticated as "${screen_name}"`);
        main();
    }, err => {
        logger.error('Authentication failed: Invalid credentials.', {error: err});
        process.exit(1);
    });

function main() {
    // Stream Tweets
    stream.on('data', res => {
        let reply_to_name = res.in_reply_to_screen_name;
        let reply_to_status = res.in_reply_to_status_id;

        if (reply_to_name === screen_name && reply_to_status == null) {
            let reply_from = res.user.screen_name;
            reply(res.id_str,reply_from, res.text);        
        }        
    });
}

function reply(status_id, screen_name, text) {
    let syllables = getSyllables(text);
    let message = `@${screen_name}\nSyllable Count: ${syllables.count}\nPhonemes: ${syllables.phonemes}`;

    let params = {
        in_reply_to_status_id: status_id, 
        status: message
    };

    client.post('statuses/update', params)
        .then((res) => {
            logger.info('Successfully replied to a syllable request', {tweet: res.text});
        }, err => {
            logger.error('Error replying to a syllable request', {error: err});
        });
}

function getSyllables(text) {
    var message = text.replace(/@\S+/img, '');
    message = message.replace(/\s+/img, ' ');
    return countSyllables(message.trim());
}



