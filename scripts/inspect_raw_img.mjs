import { chromium } from 'playwright';

async function inspectImg() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(`
    <style>body { margin: 0; background: #333; }</style>
    <img id="test" src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/public/images/hero-flying-kick.jpg" style="max-width: 100%; height: auto;" />
  `);
  await page.screenshot({ path: 'screenshots/inspect_raw_hero_flying_kick.png' });
  await browser.close();
  console.log('Saved screenshots/inspect_raw_hero_flying_kick.png');
}

inspectImg();

