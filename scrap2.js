
var https = require('https');
var urlss = require('url');


var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
var urlSet = new Set();
var currentUrl = 0;
var totalLoop = 5;

urlSet.add('https://medium.com');

var iterator = urlSet.values();

for( var i = 0; i < totalLoop; i++ ) {
    getNextUrl();
}
 
function getNextUrl(){
 
    var urlFetch = "";
    if((urlFetch = iterator.next().value) == null){
        console.log("nothing else to do for this worker");
        return;
    }
    var curURL = urlss.parse(urlFetch);
 
    var options = {
        host: curURL.host,
        path: curURL.pathname
    };
 
    https.get(options, function(res) {
 
        res.resume();
        res.on('data', function (chunk) {
            if(res.statusCode == 200){
                var str = chunk.toString();
                var urls = str.match(urlRegex);
                addToSet(urls);
            }
        });
 
        res.on('end', function() {
            console.log("finish to fetch id: " + options.host);
            // do something with the HTML page
 
            getNextUrl(); //call the next url to fetch
        });
 
    }).on('error', function(e) {
       console.log("Error: " + options.host + "\n" + e.message);
       getNextUrl();
    });
}

function addToSet(urls) {
    if(urls != null) {
        for(var i=0; i<urls.length; i++) {
            urlSet.add(urls[i], false);
        }
    }
}