const moment = require('moment-timezone');

console.log(moment.tz('Asia/Manila').format('MM/DD/YYYY hh:mm:ss A [GMT]Z'));