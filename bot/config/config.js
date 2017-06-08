require('dotenv').config({path: __dirname + '/.env'});
/**
 * Contains API keys and tokens.
 * 
 * NOTE: .env file must be inside the /config directory
 */

const twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

module.exports = {
  twitter
};