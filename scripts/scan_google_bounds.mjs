import { chromium } from 'playwright';

async function scanGoogleBounds() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + '/screenshots/google_original_flying_kick.jpg');
  
  const bounds = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    const img = document.querySelector('img');
    // Scale down to 768x1024 for quick analysis
    canvas.width = 768;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    // studio background is around rgb(200..230, 215..240, 225..250)
    let minX = canvas.width, maxX = 0, minY = canvas.height, maxY = 0;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        const r = d[i], g = d[i+1], b = d[i+2];
        const diff = Math.abs(r - 215) + Math.abs(g - 225) + Math.abs(b - 238);
        if (diff > 40) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    return {
      scaled: { minX, maxX, minY, maxY, w: canvas.width, h: canvas.height },
      origScaleFactor: 4,
      origBox: {
        minX: minX * 4,
        maxX: maxX * 4,
        minY: minY * 4,
        maxY: maxY * 4,
        w: 3072,
        h: 4096
      }
    };
  });

  console.log('Person bounding box in 12MP original:', bounds);
  await browser.close();
}

scanGoogleBounds();

