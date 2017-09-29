/**
 * @module
 * Tweet Reddit contents using the Reddit API via snoowrap
 */
const {postStatus} = require('./../../api/twitter-api');
const fetchTopContents = require('./../reddit/fetchTopContents');
const logger = require('./../logger');

const tweetRedditTopContent = async() => {
    try {
        // Fetch Reddit Posts
        let redditCont = await fetchTopContents();

        let url = 'www.reddit.com';
        for (let content of redditCont) {
            let permalink = url + content.permalink;
            let twitterStatus = `${content.title}\n${permalink}\nsource: ${content.subreddit_name_prefixed}`;
            postStatus({status: twitterStatus}).then(res => {
                logger.info('Successfully posted a reddit post.', {tweet: res.text});
            }).catch(err => {
                logger.error('Error posting a reddit post.', {error: err});  
            });
        }

    } catch (err) {
        console.log(err);
        logger.error('Error in tweeting reddit top contents', {error: err});

    }

};

tweetRedditTopContent();

module.exports = tweetRedditTopContent;
