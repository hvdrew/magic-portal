## Magic Portal File Transfer Tool

This tool provides a CLI interface much like magic-wormhole, but it focuses on file transfers within a local network.

It allows for a receiving client to run a command and generate a secret phrase, which can then be shared with the sending client. If the sender inputs the same key as the receiving client was instructed to use, a connection is established and the file begins transferring.

All transfers will be encrypted and compressed for best results.

Currently only the initial handshake is functional.


### Setup

No external dependencies are required. Simply clone and run!

Running Client:
`node client.js`

Running Server:
`node server.js SHARED-PASS-PHRASE`
