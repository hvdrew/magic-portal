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

function receiveHandler(cliInstance) {
    const key = cliInstance.key;
    const broadcastAddresses = getBroadcastAddresses();
    const client = dgram.createSocket('udp4');
    
    client.bind(8000, undefined, () => {
        client.setBroadcast(true);
    });
    
    client.on('message', (msg, rinfo) => {
        if (msg.toString() == 'Paired') {
            console.log('Pairing complete, requesting file');
            http.get(`http://${rinfo.address}:3000`, (response) => {
                let data = '';
                
                response.on('data', (chunk) => {
                    data += chunk;
                });
                
                response.on('end', () => {
                    console.log(data);
                });
            }).on('error', error => console.error(error));
            
        }
    })

    //broadcastAddresses.forEach(addr => {
        client.send(key, 41234, broadcastAddresses[0], (err) => {
            // TODO: We want to start a server once this is completed since the sending client will have our IP from here on.
            // Need to spin up a web server, set some handlers for file transfer.
            // client.close();
            console.log('sent key to ', broadcastAddresses[0])
        });
    //})
}

module.exports = receiveHandler;