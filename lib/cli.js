const fs = require('fs');

/**
 * Class handles most CLI related operations outside of the main functionality of
 * the program.
 */
class CLI {
    mode;
    file;
    key;
    
    constructor() {
        this.validateArguments();
        this.clear();
        this.startupMessage();
    }
    
    /**
     * Clears the console
     */
    clear() {
        console.clear();
    }
    
    /**
     * Logs the usage instructions for the CLI.
     */
    usage() {
        console.log(
`-- Magic Portal --
Usage:
magicportal [action] [file|key]

Available Actions:
send        Prepares a file for sending to another client. Requires a file to
            be provided as the final argument.

receive     Uses the provided key (required) to find another machine that is 
            attempting to transfer a file.
            
            `
        );
    }
    
    /**
     * Displays a message that gives instructions for the sending user, along
     * with the key that was generated for the session.
     */
    sendCommandMessage() {
        console.log(`Please have the receiving user enter the following command on their machine:

    magic-portal receive ${this.key}
    
Listening for their connection...`)
    }
    
    /**
     * Logs the startup message
     */
    startupMessage() {
        console.log(`-- Magic Portal --                                
Running in ${this.mode} mode.`
        );
    }
    
    /**
     * Validates command line arguments
     */
    validateArguments() {
        if (process.argv.length != 4) {
            console.error('Invalid amount of arguments. Please try your command again.\n');
            this.usage();
            process.exit(1);
        }
        
        switch(process.argv[2]) {
            case 'send':
                this.file = process.argv[3];
                this.validateFilePath(this.file);
                break;
            case 'receive':
                this.key = process.argv[3];
                this.validateKeyFormat(this.key);
                break;
            default:
                console.error('Invalid mode provided. Please try your command again.\n');
                this.usage();
                process.exit(1);
                break;
        }
        
        this.mode = process.argv[2];
    }
    
    /**
     * Validates the given file path to ensure that it exists on the system
     */
    validateFilePath(file) {
        try {
            if (fs.existsSync(file)) {
                return;
            } else {
                // File wasn't found, but we didn't get an error
                console.error('Provided file path was not valid or not found. Please try again.');
                process.exit(1);
            }
        } catch (error) {
            console.error('Provided file path was not valid or not found. Please try again.');
            process.exit(1);
        }
    }
    
    /**
     * Validates that the key provided in receive mode matches the expected format.
     */
    validateKeyFormat(key) {
        if (key.split('-').length !== 3) {
            console.error('Invalid key format. Please try your command again.');
            process.exit(1);
        }
        return;
    }
}

module.exports = new CLI();