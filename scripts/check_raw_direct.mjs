import { chromium } from 'playwright';

async function checkRawOriginal() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  
  // Show the RAW image directly with NO styles, NO container, NO crop
  await page.goto('http://localhost:5173/images/hero-flying-kick.jpg');
  await page.screenshot({ path: 'screenshots/raw_direct_hero_flying_kick.png' });
  console.log('Saved raw_direct_hero_flying_kick.png');

  // Also let's inspect the dimensions and what is at the top of the raw image
  const dims = await page.evaluate(() => {
    const img = document.querySelector('img');
    return {
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight
    };
  });
  console.log('Raw image dimensions:', dims);

  await browser.close();
}

checkRawOriginal();

