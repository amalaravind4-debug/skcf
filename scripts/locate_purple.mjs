import { chromium } from 'playwright';

async function locatePurpleRobe() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/hero-flying-kick.jpg');
  
  const box = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    const img = document.querySelector('img');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    let minX = canvas.width, maxX = 0, minY = canvas.height, maxY = 0;
    let found = 0;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        const r = d[i], g = d[i+1], b = d[i+2];
        // purple robe
        if (r > 120 && r < 180 && g > 110 && g < 170 && b > 140 && b < 210) {
          found++;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    return { found, minX, maxX, minY, maxY, w: canvas.width, h: canvas.height };
  });

  console.log('Purple robe location in hero-flying-kick:', box);
  await browser.close();
}

locatePurpleRobe();

