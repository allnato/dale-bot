const Twitter = require('twitter');
const config = require('./../config/config').twitter;
/**
 * Twitter API connector.
 * 
 * Returns a connection instance of twitter.
 */

const client  = new Twitter(config);

module.exports = client;