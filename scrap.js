var https = require('https');

var options = {
    host: 'medium.com'
};

var urlSet = new Set();

var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    
https.get(options, function(res){
    // console.log("status code: ", res.statusCode);
    res.on('data', function(chunk){
        //do something with chunk
        var str = chunk.toString();
        var urls = str.match(urlRegex);
        console.log(options.host);
        addToSet(urls);
    });

    res.on('end', function() {
        // console.log(urlSet);
    });

}).on("error", function(e){
    console.log("Got error: " + e.message);
});

function addToSet(urls) {
    if(urls != null) {
        for(var i=0; i<urls.length; i++) {
            urlSet.add(urls[i], false);
        }
    }
}
