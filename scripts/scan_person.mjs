import { chromium } from 'playwright';

async function scanPerson() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/hero-flying-kick.jpg');
  
  const scan = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    const img = document.querySelector('img');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const bgR = 206, bgG = 223, bgB = 239;
    let minY = 1000, minX = 1500, maxY = 0, maxX = 0;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const d = ctx.getImageData(x, y, 1, 1).data;
        const diff = Math.abs(d[0] - bgR) + Math.abs(d[1] - bgG) + Math.abs(d[2] - bgB);
        if (diff > 45) {
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
        }
      }
    }
    return { minY, minX, maxY, maxX, w: canvas.width, h: canvas.height };
  });

  console.log('Person exact bounds:', scan);
  await browser.close();
}

scanPerson();

