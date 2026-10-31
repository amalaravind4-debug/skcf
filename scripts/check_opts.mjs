import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  for (const opt of ['option1_crop.png', 'option2_crop.png']) {
    await page.goto('file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/' + opt);
    const bounds = await page.evaluate(() => {
      const img = document.querySelector('img');
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      // check top row of the image inside
      let minX = canvas.width, maxX = 0, minY = canvas.height, maxY = 0;
      for (let y = 50; y < canvas.height - 20; y++) {
        for (let x = 20; x < canvas.width - 20; x++) {
          const i = (y * canvas.width + x) * 4;
          // check if purple or person
          const r = d[i], g = d[i+1], b = d[i+2];
          if (r > 120 && r < 180 && g > 110 && g < 170 && b > 140 && b < 210) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      return { minX, maxX, minY, maxY };
    });
    console.log(opt, bounds);
  }
  await browser.close();
}

main();

