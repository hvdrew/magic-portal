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