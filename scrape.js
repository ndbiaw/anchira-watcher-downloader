const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  const urls = fs.readFileSync('urls.txt', 'utf-8').split('\n');

  for (const url of urls) {
    if (url.trim() === '') {
      continue;
    }

    const page = await browser.newPage();

    try {
      await page.goto(url);

      await page.waitForSelector('.d[title="Download"]');

      await page.click('.d[title="Download"]');

      await page.waitForSelector('.dl[title="Save to disk"]', { timeout: 600000 });
      await page.waitForTimeout(2500);
      console.log(`Đã tải xuống từ ${url}`);

    } catch (error) {
      console.error(`Lỗi khi tải xuống từ ${url}: ${error}`);
    } finally {
      await page.close();
    }

  }

  await browser.close();
})();
