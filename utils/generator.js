module.exports = function generate() {
    let key = '';
    const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < 16; i++) {
        key += str[getRandomInRange(0, 61)];
    }

    return key;
};

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}