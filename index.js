/**
 * Entry point for the application. Parses input and decides what to do.
 */
const cli = require('./lib/cli');
const sendHandler = require('./send');
const receiveHandler = require('./receive');

if (cli.mode == 'send') {
    sendHandler(cli);
} else if (cli.mode == 'receive') {
    receiveHandler(cli);
}