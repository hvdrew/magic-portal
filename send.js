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

function sendHandler(cliInstance) {
    // Set the key for the transfer
    cliInstance.key = require('./lib/key')();
    
    // Spin up a dgram server
    const server = dgram.createSocket('udp4');

    server.on('error', (err) => {
        console.log(`server error:\n${err.stack}`);
        server.close();
    });
      
    server.on('message', (msg, rinfo) => {
        if (msg == cliInstance.key) console.log(`Server got correct key!`);
        console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
        
        // TODO: If the key matches, we need to start trying to connect to the address we now have
        // On a predetermined port. This should be broken out into it's own separate method.
    });
    
    server.on('listening', () => {
        const address = server.address();
        console.log(`server listening ${address.address}:${address.port}`);
    });
      
    server.bind(41234);
    
    cliInstance.sendCommandMessage();
}

module.exports = sendHandler;