
exports.TARGET_WEBSITE = 'https://medium.com';

// exports.TARGET_WEBSITE = 'http://www.sarvaha.com';

exports.URL_REGEX = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

exports.FILE_NAME = 'output.txt';

// allowed concurrent connections, for big websites recommended 20.
exports.MAX_CONN = 5;