# Scraper

This is a simple web-scraper which downloads all URLS from the source website to a file. It is implemented in NodeJS, without using any external module.

## Installation

### Requirements
* NodeJS V9

### Running Scraper
* Clone this repository.
* Open 'scraper' directory.
* Run following command:
    
    `$ node scrap`

## Changing website URL

Go to scraper folder, and open `constants.js`.

```
    //change the website name
    exports.TARGET_WEBSITE = 'https://medium.com';
    //change the hostname
    exports.HOST_NAME = 'medium.com';  //'www.sarvaha.com';
    //Maximum parallel connections allowed.
    exports.MAX_CONN = 5;
    //output file name.
    exports.FILE_NAME = 'output.txt';
```

