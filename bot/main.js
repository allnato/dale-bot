const client = require('./api/twitter-api');
const logger = require('./utils/logger');
const countSyllables = require('./utils/lang/countSyllables');

const stream = client.stream('user');
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
        let reply_to_status = res.in_reply_to_status_id_str;

        if (reply_to_name === screen_name &&  reply_to_status == null) {
            reply(reply_to_status, res.text);        
        }        
    });
}

function reply(status_id, text) {
    let syllables = getSyllables(text);
    let message = `Syllable Count: ${syllables.count}\nPhonemes: ${syllables.phonemes}`;

    client.post('statuses/update', {status: message, in_reply_to_status_id: status_id})
    .then(() => {
        logger.info('Replied to a syllable request');
    }, err => {
        logger.error('Error replying to a syllable request', {error: err});
    });
}

function getSyllables(text) {
    let message = text.replace(/@S\+/img, '');
    message = message.replace(/\s+/img, ' ');
    return countSyllables(message);
}



