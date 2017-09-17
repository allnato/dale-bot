const getTop = require('./../../api/reddit-api').getTop;

const mySubreddits = [
    'nottheonion',
    'videos',
    'funny',
    'gifs',
    'pics',
    'gaming',
    'aww',
    'dankmemes',
    'programmerhumor',
    'crappydesign',
    'upliftingnews',
    'mildyinteresting',
    'food'
];


function getRandomNumber(max){
    return Math.floor(Math.random() * max);
}

function getRandomSubreddit(x = 3) {
    let subredditList = [];
    for (let i = 0; i < x ; i++) {
        let randomNum = getRandomNumber(mySubreddits.length);
        while (subredditList.includes(mySubreddits[randomNum])) {
            randomNum = getRandomNumber(mySubreddits.length);
        }
        subredditList.push(mySubreddits[randomNum]);
    }
    return subredditList;
}

const fetchTopContents = async() => {
    let list = getRandomSubreddit();
    let getTopPromise = [];
    let topContents = [];
    
    for (let subreddit of list) {
        getTopPromise.push(getTop(subreddit));
    }

    let contentRes = await Promise.all(getTopPromise);
    for (let content of contentRes) {
        topContents.push(content[getRandomNumber(content.length)]);
    }
    return topContents;
};


module.exports = fetchTopContents;
