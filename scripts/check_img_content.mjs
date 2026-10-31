import { chromium } from 'playwright';

async function checkImgContent() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + '/screenshots/google_orig_scaled_fit.png');
  
  // What is shown in the image?
  const textOrContent = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    const img = document.querySelector('img');
    // let's sample regions
    return { ok: true };
  });
  console.log('Img ready');
  await browser.close();
}

checkImgContent();

