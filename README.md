# Scraper

    # Scraper 

This is a simple web-scraper which downloads all URLS from the source website. It is implemented in NodeJS, without using any external module.

## Installation

### Requirements
* NodeJS V9
* NPM

`$ pip install foobar`

## Changing website URL

Go to scraper folder, and open `constants.js`.

```
    exports.TARGET_WEBSITE = 'https://medium.com'; //'http://www.sarvaha.com'

    exports.HOST_NAME = 'medium.com';  //'www.sarvaha.com';

    exports.URL_REGEX = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

    exports.FILE_NAME = 'output.txt';

    exports.MAX_CONN = 5;
```

