/**
 * Removes the '@' sign mentions in a tweet text.
 */

const filterMentions = tweet => {
    let message = tweet.replace(/@\S+/img, '');
    message = message.replace(/\s+/img, ' ');
    return message.trim();
};

module.exports = filterMentions;