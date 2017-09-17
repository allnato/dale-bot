const Twitter = require('twitter');
const config = require('./../config/config').twitter;
/**
 * Twitter API connector.
 * 
 * Creates a Twitter connection instance and returns Twitter methods. 
 */

const client  = new Twitter(config);

function getUserStream() {
    return client.stream('user', {replies: 'all'});
}

function verifyCredentials() {
    return client.get('account/verify_credentials',{});
}

function postStatus(params) {
    return client.post('statuses/update', params);
}

module.exports = {
    getUserStream,
    verifyCredentials,
    postStatus
};