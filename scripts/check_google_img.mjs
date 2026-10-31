import { chromium } from 'playwright';

async function checkGoogleImg() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + '/screenshots/google_original_flying_kick.jpg');
  const img = await page.$('img');
  const dims = await img.evaluate(el => ({ w: el.naturalWidth, h: el.naturalHeight }));
  console.log('Google original image dimensions:', dims);

  // Take a full screenshot of this image
  await page.screenshot({ path: 'screenshots/google_original_preview.png' });
  console.log('Saved google_original_preview.png');
  await browser.close();
}

checkGoogleImg();

