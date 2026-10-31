import { chromium } from 'playwright';

async function checkHead() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/hero-flying-kick.jpg');
  await page.waitForLoadState('networkidle');

  const bounds = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    let minY = canvas.height;
    let maxY = 0;
    let minX = canvas.width;
    let maxX = 0;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const idx = (y * canvas.width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        if (r < 235 || g < 235 || b < 235) {
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
        }
      }
    }

    return {
      naturalWidth: canvas.width,
      naturalHeight: canvas.height,
      contentBounds: { minX, minY, maxX, maxY },
      topSpace: minY,
      bottomSpace: canvas.height - maxY
    };
  });

  console.log('Original image content analysis:', bounds);
  await browser.close();
}

checkHead();
