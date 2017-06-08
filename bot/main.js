const client = require('./api/twitter-api');

// Verify Authentication
client.get('account/verify_credentials',{})
  .then(() => {
    console.log('Successfully Authenticated.');
  }, err => {
    console.log('Authentication failed: Invalid credentials.');
    console.log(err);
    process.exit(1);
  });


  