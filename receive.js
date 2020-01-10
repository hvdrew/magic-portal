/**
 * File that handles the sending logic.
 * 
 * You must provide a secret pass-phrase as the one and only argument
 * when calling this file directly from a shell. This key will
 * broadcast on the local network, hopefully matching a listening client.
 * 
 * In this file we get the first available network interface from the OS, 
 * then using that we determine the broadcast address for the network.
 * 
 * A socket is created from that point, which enables broadcast mode on the SO,
 * then sends a message with the previously mentioned key.
 */

const getBroadcastAddresses = require('./lib/broadcastAddress');
const dgram = require('dgram');
const http = require('http');
const fs = require('fs');

function receiveHandler(cliInstance) {
    const key = cliInstance.key;
    const broadcastAddresses = getBroadcastAddresses();
    const client = dgram.createSocket('udp4');
    let sentHandshake = false;
    
    client.bind(8000, undefined, () => {
        client.setBroadcast(true);
    });
    
    client.on('message', (msg, rinfo) => {
        if (msg.toString() == 'Paired' && sentHandshake) {
            let outputFile;
            outputFile = fs.createWriteStream(cliInstance.outputFileName);
            
            console.log('Pairing complete, requesting file....\n\n');
            http.get(`http://${rinfo.address}:3000`, (response) => {                
                response.on('data', (chunk) => {
                    outputFile.write(chunk);
                    process.stdout.write('=');
                });
                
                response.on('end', () => {
                    console.log(`\nAll done! Saved file to ${cliInstance.outputFileName}`);
                });
            }).on('error', error => console.error(error));
            
        }
    });
    
    client.send(key, 41234, broadcastAddresses[0], (err) => {
        console.log('sent key to ', broadcastAddresses[0])
        sentHandshake = true;
    });
}

module.exports = receiveHandler;