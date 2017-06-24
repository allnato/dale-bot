const postStatus = require('./../../api/twitter-api').postStatus;
const filterMentions = require('./filterMentions');
const countSyllables = require('./../lang/countSyllables');

const syllableRequest = (status_id, screen_name, text) => {
    text = filterMentions(text);
    let syllables = countSyllables(text);
    let message = `@${screen_name}\nSyllable Count: ${syllables.count}\nPhonemes: ${syllables.phonemes}`;

    let params = {
        in_reply_to_status_id: status_id, 
        status: message
    };

    return postStatus(params);
};

module.exports = syllableRequest;