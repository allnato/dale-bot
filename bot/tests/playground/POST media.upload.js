const client = require('./../../api/twitter-api');
const fs = require('fs');

console.log('Reading image');
let image = fs.readFileSync('astronaut.jpg', {encoding: 'base64'});

console.log('Uploading image');
client.post('media/upload', {media_data: image})
    .then(res => {
        var id = res.media_id_string;
        console.log(id);
        var status_params = {
            media_ids: id,
            status: 'Hello Astronaut 👨‍🚀 \nThis is posted via the twitter API.'
        };
        return client.post('statuses/update', status_params);
    })
    .then(() => {
        console.log('Successfully posted the image');
    })
    .catch(err => {
        console.log(err);
    });