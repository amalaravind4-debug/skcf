import { chromium } from 'playwright';

async function checkUploaded() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Amal Aravind/.gemini/antigravity/brain/fa468976-b1c3-4c62-b1fa-2178140d2808/.user_uploaded/media_1793456625124_d62215e8.jpg');
  const img = await page.$('img');
  const nw = await img.evaluate(el => ({ w: el.naturalWidth, h: el.naturalHeight }));
  console.log('User upload media_1793456625124_d62215e8.jpg dimensions:', nw);

  // Also check media_1793444438972_30f9ce04.jpg
  await page.goto('file:///C:/Users/Amal Aravind/.gemini/antigravity/brain/fa468976-b1c3-4c62-b1fa-2178140d2808/.user_uploaded/media_1793444438972_30f9ce04.jpg');
  const orig = await page.$('img');
  const origDims = await orig.evaluate(el => ({ w: el.naturalWidth, h: el.naturalHeight }));
  console.log('Original media_1793444438972_30f9ce04.jpg dimensions:', origDims);

  await browser.close();
}

checkUploaded();

