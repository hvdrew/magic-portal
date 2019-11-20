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