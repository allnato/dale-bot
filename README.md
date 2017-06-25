# dale-bot
An experimental twitter bot I built from scratch :robot:  

## Recent Alpha release [Earth-v0.3.1](https://github.com/Ollen/dale-bot/releases/tag/Earth-v0.3.1)
### ✔️ Automated Reddit content poster (New)
- dale-bot will now post various daily top subreddit contents for every 3 hours (GMT +800).
- Three random subreddit threads will be chosen by default in a list of subreddits handpicked by me. dale-bot will then a randomly pick a top daily content among the chosen subreddit threads. <br>  


### ✔️ Syllable Reply Automation
- dale-bot will now reply the syllable count ~~and phonemes~~ of the tweet message if a user directly mentions dale-bot using the screen name @_dalebot.
- dale-bot will not reply to a syllable request if he is mentioned inside an existing status. All syllable request must be a direct mention.
- dale-bot uses RiTa to parse the message and identify the phonemes and syllable count of the message.

  **Note**: As of Earth-v0.3.1, phonemes is now removed due to possible violation of twitter's 140 max character status/update.
