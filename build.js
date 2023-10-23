const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapePage(page) {
  await page.waitForSelector('article');
  const hrefs = await page.evaluate(() => {
    const articles = Array.from(document.querySelectorAll('article'));
    return articles.map(article => {
      const link = article.querySelector('a.overlay');
      if (link) {
        return link.getAttribute('href');
      }
      return null;
    });
  });

  fs.appendFileSync('urls.txt', hrefs.filter(Boolean).join('\n') + '\n');
}

async function scrapeSite() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  for (let pageNum = 512; pageNum >= 1; pageNum--) {
    const url = `https://anchira.to/?page=${pageNum}`;
    await page.goto(url);

    await scrapePage(page);

    if (pageNum > 1) {
      await page.goto(`https://anchira.to/?page=${pageNum - 1}`);
    }
  }

  await browser.close();
}

scrapeSite();
