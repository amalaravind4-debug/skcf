import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/live_flying_img_21.png');

  const meta = await page.evaluate(() => {
    const img = document.querySelector('img');
    return { w: img.naturalWidth, h: img.naturalHeight };
  });

  console.log('live_flying_img_21 dimensions:', meta);
  await browser.close();
}

main();

