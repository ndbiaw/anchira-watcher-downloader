# anchira-watcher-downloader
Script that will downloads the entire manga from anchira.to and automatically downloads the latest manga if available.
# How to use
This script is divided into 3 parts, for 3 purposes:
- Get all manga URLs on anchira.to
- Download manga from the list of available URLs
- Watch anchira.to and automatically download the latest manga

## This script requires node.js v18 or later, and pupperteer version 21 or later.
Tested on Windows 11, Nodejs 18.18.2, Puppeteer 21.4.0.
Download Nodejs at: https://nodejs.org/en
After installing nodejs (remember to select the add to PATH option), install Puppeteer using the following command:
```sh
npm i puppeteer
```
### Get all manga URLs on anchira.to
You just need to run build.js with the following command:
```sh
node build.js
```
### Download manga from the list of available URLs
Put the list of URLs you need to downloadl into the urls.txt file and run scrape.js with the following command:
```sh
node scrape.js
```
### Watch anchira.to and automatically download the latest manga
Watch anchira.to and automatically download the latest manga. You can add a download exclusion list to the downloaded.txt file. To run the watcher, use the command:
```sh
node watcher.js
```
