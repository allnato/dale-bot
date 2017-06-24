const snoowrap = require('snoowrap');
const config = require('./../config/config').reddit;

const client = new snoowrap(config);

function verifyCredentials() {
    return client.getMe();
}

module.exports = {
    verifyCredentials
};