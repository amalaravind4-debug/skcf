import { chromium } from 'playwright';

async function checkHeadPos() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/traditional-flying-kick.jpg');
  
  // Find where skin tone or head is
  const result = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    const img = document.querySelector('img');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // check if there is a head with skin tone
    let skinCount = 0;
    let minSkinY = 10000;
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const d = ctx.getImageData(x, y, 1, 1).data;
        // skin tone
        if (d[0] > 180 && d[1] > 120 && d[2] < 160 && d[0] > d[1]) {
          skinCount++;
          if (y < minSkinY) minSkinY = y;
        }
      }
    }
    return { skinCount, minSkinY, w: canvas.width, h: canvas.height };
  });

  console.log('traditional-flying-kick head result:', result);

  // Now do the same for google-maps-3.jpg
  await page.goto('http://localhost:5173/images/google-maps-3.jpg');
  const res3 = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    const img = document.querySelector('img');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    let skinCount = 0;
    let minSkinY = 10000;
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const d = ctx.getImageData(x, y, 1, 1).data;
        if (d[0] > 180 && d[1] > 120 && d[2] < 160 && d[0] > d[1]) {
          skinCount++;
          if (y < minSkinY) minSkinY = y;
        }
      }
    }
    return { skinCount, minSkinY, w: canvas.width, h: canvas.height };
  });

  console.log('google-maps-3.jpg head result:', res3);
  await browser.close();
}

checkHeadPos();

