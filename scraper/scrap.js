
var https = require('https');
var _url = require('url');
var http = require('http');
var Queue = require('./queue');
var constants = require('./constants.js');
var utils = require('./utils.js');

var urlSet = new Map();
var queue = new Queue();

var connections = 0;
var count = 0;

var hostName = _url.parse(constants.TARGET_WEBSITE).host;
utils.hostName(hostName);

queue.enqueue(constants.TARGET_WEBSITE);
urlSet.set(constants.TARGET_WEBSITE, false);

init();

function init() {
    console.log("\nvisiting: init():count " + count++);
    
    if(queue.isEmpty()) {
        console.log("connections: " + connections);
        console.log("****end of queue");
        return;
    }

    var curURL = queue.front();
    queue.dequeue();
    
    if(curURL != -1) {
        connections++;
        if(utils.isValidURL(curURL) && !urlSet.get(curURL) ) {
            urlSet.set(curURL, true);
            startFetching(curURL);
        } else {
            reduceConnAndInit();  
        } 
    } else {
        if(queue.isEmpty()) {
            console.log("connections: " + connections);
            console.log("****end of queue");
            return;
        }
        console.log("empty: " + queue.isEmpty());
    }
    return;
}


function startFetching(options) {
    
    console.log("connections: " + connections);
    console.log("*********** Fetchng started: " + options);
    if(options.substring(0, 5) == 'https') {
        https.get(options, function(res){
            var data = null;
            res.on('data', function(chunk){
                data += chunk;
            });
    
            res.on('end', function() {
                if(data != null) {
                    console.log("data: ", data == null);
                    var str = data.toString();
                    var urls = str.match(constants.URL_REGEX);
                    addToQueue(urls, urlSet, queue);
                    console.log(urls);
                }
                reduceConnAndInit();       
            });
    
        }).on("error", function(e) {
            console.log("Got error: " + e.message);
            reduceConnAndInit();
        });
    } else {
        http.get(options, function(res){
            var data = null;
            res.on('data', function(chunk){
                data += chunk;
            });
    
            res.on('end', function() {
                if(data != null || data != "") {
                    var str = data.toString();
                    var urls = str.match(constants.URL_REGEX);
                    addToQueue(urls, urlSet, queue);
                    console.log(urls);
                }
                reduceConnAndInit();
            });
    
        }).on("error", function(e){
            console.log("Got error: " + e.message);
            reduceConnAndInit();
        });
    }
}



function reduceConnAndInit() {
    if(queue.isEmpty()) {
        // savedToFile = true;
        // utils.writeToFile(urlSet);
        console.log("connections: " + connections);
        console.log("****end of queue");
        return;
    }
    connections--;
    if(connections < constants.MAX_CONN) {
        for(var i=0; i<constants.MAX_CONN - connections; i++)
            init();
    }
    return;
}


function addToQueue (urls, urlSet, queue) {
    if(urls != null) {
        var urlData = [];
        for(var i=0; i<urls.length; i++) {
            var _url_ = urls[i];
            //removing end slash to eliminate duplicate urls
            if(_url_.charAt(_url_.length - 1) == '/') {
                _url_ = _url_.substring(0, _url_.length - 1);
            }
            if(!urlSet.has(_url_)) {
                urlSet.set(_url_, false);
                urlData.push(_url_);
            }
            if(utils.isValidURL(_url_)) {
                queue.enqueue(_url_);
            }
        }
        utils.writeToFile(urlData);
    }

}
