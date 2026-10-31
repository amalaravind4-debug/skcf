import { chromium } from 'playwright';

async function checkTraditionalFlyingKick() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 800, height: 1000 } });
  await page.goto('http://localhost:5173/images/traditional-flying-kick.jpg');
  await page.screenshot({ path: 'screenshots/preview_traditional_flying_kick.png' });
  console.log('Saved preview_traditional_flying_kick.png');
  await browser.close();
}

checkTraditionalFlyingKick();

