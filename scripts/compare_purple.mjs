import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Let's get the bounding box of the purple robe in both images
  for (const file of ['hero-flying-kick.jpg', 'traditional-flying-kick.jpg']) {
    await page.goto(`http://localhost:5173/images/${file}`);
    const res = await page.evaluate(() => {
      const img = document.querySelector('img');
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      let minX = canvas.width, maxX = 0, minY = canvas.height, maxY = 0;
      let count = 0;
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const i = (y * canvas.width + x) * 4;
          const r = d[i], g = d[i+1], b = d[i+2];
          // purple robe
          if (r > 120 && r < 185 && g > 110 && g < 175 && b > 140 && b < 210) {
            count++;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      return { w: canvas.width, h: canvas.height, count, minX, maxX, minY, maxY };
    });
    console.log(file, res);
  }
  await browser.close();
}

main();

