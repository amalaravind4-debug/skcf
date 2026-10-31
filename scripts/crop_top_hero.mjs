import { chromium } from 'playwright';

async function cropTopHero() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/hero-flying-kick.jpg');
  const img = await page.$('img');
  // take screenshot of top half of the image
  await img.screenshot({ path: 'screenshots/hero_actual_top.png', clip: { x: 0, y: 0, width: 1024, height: 400 } });
  console.log('Saved hero_actual_top.png');
  await browser.close();
}

cropTopHero();

