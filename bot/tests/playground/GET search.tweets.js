const client = require('./../../api/twitter-api');

client.get('search/tweets', {q: '#newyork', count: 5, result_type: 'popular'})
    .then((res) => {
        for (let x of res.statuses) {
            console.log(x.text);
        }
    }, err => {
        console.log(err);
    });
