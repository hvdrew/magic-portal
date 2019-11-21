/**
 * File that handles the receiving logic.
 * 
 * Running this directly will generate a key, start a socket listener,
 * and wait for a broadcast message containing a matching key.
 * 
 * Once this is complete the responding machine will send it's local IP
 * and port, so we can start a more appropriate server and begin the 
 * transfer process at that point.
 */

const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const myKey = require('./lib/key')();

console.log(
`Please have the receiving user enter the following command on their machine:

    magic-portal receive ${myKey}

Listening for their connection...`
);

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
  });
  
server.on('message', (msg, rinfo) => {
    if (msg == myKey) console.log(`Server got correct key!`);
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
    const address = server.address();
    // console.log(`server listening ${address.address}:${address.port}`);
});
  
server.bind(41234);