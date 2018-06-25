
var _url = require('url');
var fs = require('fs');
var constants = require('./constants.js');
var utils = require('./utils.js');

exports.hostName = function(host) {
    if(host) {
        this.hostname = host;
        // console.log("***hostname is set");
    } else {
        return this.hostname;
    }
}

exports.isValidURL = function(url) {
    var curURL = _url.parse(url);
    var hostName = curURL.host;
    if(!utils.isValidHostName(hostName) || utils.isInvalidExtension(url)) {
        return false;
    }
    return true;
}

// urls with hostname equal to provided website urls are being scraped
exports.isValidHostName = function(host) {
    // console.log("hostname: ", utils.hostName());
    if(host == utils.hostName())
        return true;
    return false;
}

// ignoring to scrap urls with invalid extensions
exports.isInvalidExtension = function(url) {
    var extensions = ['css', 'js', 'svg', 'ico', 'pdf', 'xml', 'mp4', 'm4a', 'png', 'jpg', 'jpeg', 'txt', 'gif'];
    var urlLength = url.length;
    var extItemLength;

    for(var i=0; i<extensions.length; i++) {
        extItemLength = extensions[i].length;
        var urlExt = url.substring(urlLength - extItemLength, urlLength);
        if(urlExt == extensions[i])
            return true;
    }

    return false;
}

//string all urls including other domain urls as well
exports.writeToFile = function(data) {
    var str = "";
    for(var i=0; i<data.length; i++) {
        str += data[i] + "\n";
    }

    fs.appendFile(constants.FILE_NAME, str, function (err) {
        if (err) {
            throw err;
        }
        console.log('Saved to file!');
    });
}