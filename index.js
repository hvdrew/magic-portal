/**
 * Entry point for the application. Parses input and decides what to do.
 */

// const sendingHandler = require('./send');
// const receivingHandler = require('./receive');

// Expects one of the following:
// magic-portal send FILENAME
// magic-portal receive PASSPHRASE
if (process.argv.length != 4) {
    // Throw an error and exit.
    console.error('Invalid amount of arguments. Please try your command again.');
    process.exit(1);
}

const mode = process.argv[2];
let file;
let key;

switch(mode) {
    case 'send':
        file = process.argv[3];
        console.log('Send command inputted, filename: ', file);
        break;
    case 'receive':
        key = process.argv[3];
        console.log('Recieve command inputted, key: ', key);
        break;
    default:
        console.error('Invalid command provided. Please check your input and try again.');
        process.exit();
        break;
}

// Output some info to start:
console.clear();
console.log(
`==============
 Magic Portal 
==============

Running in ${mode} mode.
`);

// Load in what we need:
if (mode == 'send') require('./send');
else require('./receive');