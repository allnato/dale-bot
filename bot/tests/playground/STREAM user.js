const client = require('./../../api/twitter-api');

var stream = client.stream('user');

stream.on('data', (event) => {
    console.log(`From: ${event.user.screen_name}`);
    console.log(`To: ${event.in_reply_to_screen_name}`);
    console.log(`Message: ${event.text}`);
});


