import { chromium } from 'playwright';

async function findPersonBox() {
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

    // background is around rgb(215..235, 220..240, 230..250)
    let minX = canvas.width, maxX = 0, minY = canvas.height, maxY = 0;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        const r = d[i], g = d[i+1], b = d[i+2];
        // if difference from studio background is significant (e.g. purple robe, black belt, shoes, skin)
        const dist = Math.abs(r - 217) + Math.abs(g - 227) + Math.abs(b - 239);
        if (dist > 35) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    return {
      w: canvas.width,
      h: canvas.height,
      minX, maxX, minY, maxY,
      personWidth: maxX - minX,
      personHeight: maxY - minY,
      topGap: minY,
      bottomGap: canvas.height - maxY
    };
  });

  console.log('Person bounding box:', box);
  await browser.close();
}

findPersonBox();

