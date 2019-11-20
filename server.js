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

let key;
if (process.argv.length != 3) {
    console.log('Invalid input.');
    process.exit(1);
} else {
    key = process.argv[2];
}

const findBroadcastAddress = require('./lib/broadcastAddress');
const os = require('os');
const dgram = require('dgram');

const broadcastAddr = findBroadcastAddress(Object.keys(os.networkInterfaces())[0])

const client = dgram.createSocket('udp4');

client.bind(8000, undefined, () => {
    client.setBroadcast(true);
});

client.send(key, 41234, broadcastAddr, (err) => {
    client.close();
});