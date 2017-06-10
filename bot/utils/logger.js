const winston = require('winston');
const fs = require('fs');
const path = require('path');
require('winston-daily-rotate-file');

let logDir = path.resolve(__dirname, '..', 'logs');

// Check if bot/logs exists
if ( !fs.existsSync(logDir) ) {
    fs.mkdirSync(logDir);
}

// Change log file everyday
let dailyRotateFile = new winston.transports.DailyRotateFile({
    filename: path.join(logDir, '.log'),
    datePattern: 'yyyy-MM-dd',
    prepend: true,
    timestamp: () => new Date(Date.now()).toUTCString()
});

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: 'all'
        }),
        dailyRotateFile
    ]
});


module.exports = logger;