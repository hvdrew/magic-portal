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
const fs = require('fs');
const httpServer = require('http').createServer();

function fileTransferServerHandler(file) {
    httpServer.on('request', (req, res) => {
        console.log('received request!')
        const sourceFile = fs.createReadStream(file);
        sourceFile.pipe(res);
    });
    
    httpServer.listen(3000, () => console.log('Listening on 3000 for partner machine to connect.'));
}

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
        
        server.send('Paired', rinfo.port, rinfo.address, (err) => {
            console.log('Paired with ' + rinfo.address);
            server.close();
        });
        fileTransferServerHandler(cliInstance.file);
    });
    
    server.on('listening', () => {
        const address = server.address();
        console.log(`server listening ${address.address}:${address.port}`);
    });
      
    server.bind(41234);
    
    cliInstance.sendCommandMessage();
}

module.exports = sendHandler;