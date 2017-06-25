const snoowrap = require('snoowrap');
const config = require('./../config/config').reddit;

const client = new snoowrap(config);

function verifyCredentials() {
    return client.getMe();
}

function getTop(subreddit, options={time:'day', limit: 10}) {
    return client.getTop(subreddit, options);
}

module.exports = {
    verifyCredentials,
    getTop
};