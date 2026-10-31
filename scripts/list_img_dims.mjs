import { chromium } from 'playwright';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const files = fs.readdirSync('public/images').filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  const results = [];

  for (const f of files) {
    await page.goto(`http://localhost:5173/images/${f}`);
    const res = await page.evaluate(() => {
      const img = document.querySelector('img');
      return { w: img.naturalWidth, h: img.naturalHeight };
    });
    results.push({ file: f, ...res });
  }

  console.log(JSON.stringify(results, null, 2));
  await browser.close();
}

main();

