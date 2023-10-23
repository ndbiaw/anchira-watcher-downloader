const puppeteer = require('puppeteer');
const fs = require('fs');
const readline = require('readline');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://anchira.to/');
  await page.waitForSelector('article a.overlay');

  const hrefs = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('article a.overlay'));
    return links.map(link => `https://anchira.to${link.getAttribute('href')}`);
  });

  const downloadedUrls = new Set();
  if (fs.existsSync('downloaded.txt')) {
    const fileStream = fs.createReadStream('downloaded.txt');
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      downloadedUrls.add(line);
    }
  }

  const urlsToDownload = hrefs.filter(href => !downloadedUrls.has(href));

  fs.writeFileSync('urls.txt', urlsToDownload.join('\n'));

  for (const url of urlsToDownload) {
    await page.goto(url);
    await page.waitForSelector('.d[title="Download"]');
    await page.click('.d[title="Download"]');
    await page.waitForSelector('.dl[title="Save to disk"]', { timeout: 600000 });
    console.log(`Downloaded ${url}`);
    downloadedUrls.add(url);

    await page.waitForTimeout(2500);
  }

  fs.writeFileSync('downloaded.txt', Array.from(downloadedUrls).join('\n'));
  fs.writeFileSync('urls.txt', '');

  await browser.close();
})();
