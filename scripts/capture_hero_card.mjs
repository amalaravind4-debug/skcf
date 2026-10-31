import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173');
  const img = await page.$('img[alt*="Airborne Flying Kick"]');
  if (img) {
    const parent = await img.evaluateHandle((el) => el.parentElement);
    await parent.screenshot({ path: 'screenshots/hero_card_captured.png' });
    console.log('Saved hero_card_captured.png');
  }
  await browser.close();
}

run();

