var https = require('https');

var options = {
    host: 'medium.com'
};

var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    
https.get(options, function(res){
    console.log("status code: ", res.statusCode);
    // res.writeHead(302, {'Location': 'https://example.com' + req.url});
    res.on('data', function(chunk){
        //do something with chunk
        var str = chunk.toString();
        var urls = str.match(urlRegex);
        console.log("Got data: ", urls);
    });
}).on("error", function(e){
    console.log("Got error: " + e.message);
});
