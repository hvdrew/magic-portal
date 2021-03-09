## Magic Portal File Transfer Tool

This tool provides a CLI interface much like magic-wormhole, but it focuses on file transfers within a local network.

It allows for a receiving client to run a command and generate a secret phrase, which can then be shared with the sending client. If the sender inputs the same key as the receiving client was instructed to use, a connection is established and the file begins transferring.

All transfers will be encrypted and compressed for best results.

Currently file transfers are not compressed or encrypted.


### Setup

No external dependencies are required. Simply run 
`npm i -g magic-portal-cli`!

Sending Files:  
`magic-portal send ./some-file-path.js`

Receiving Files:  
`magic-portal receive SHARED-PASS-PHRASE output-file-name.js`
