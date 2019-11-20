/**
 * This file is responsible for generating a readable key
 * for use during the initial discovery process.
 * 
 * This key will be printed to stdout when the script is ran,
 * and can be shared with the other user at that point.
 * 
 * Horribly basic logic for now.
 */

const words = [
    'HAPPY',
    'PURPLE',
    'ZEBRA',
    'DONKEY',
    'HORSE',
    'BABY',
    'FREE',
    'HARD'
];

module.exports = function getKey() {
    let key = [];
    for (let i = 0; i < 3; i++) {
        key.push(words[Math.floor(Math.random() * words.length)]);
    }
    
    key = key.join('-');
    return key;
}