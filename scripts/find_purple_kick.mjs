import fs from 'fs';
import { chromium } from 'playwright';

async function findPurpleKick() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const files = fs.readdirSync('public/images').filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

  for (const f of files) {
    await page.goto(`http://localhost:5173/images/${f}`);
    const isPurple = await page.evaluate(() => {
      const img = document.querySelector('img');
      const canvas = document.createElement('canvas');
      canvas.width = Math.min(img.naturalWidth, 400);
      canvas.height = Math.min(img.naturalHeight, 400);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      let purpleCount = 0;
      let whiteBgCount = 0;
      for (let i = 0; i < d.length; i += 4) {
        // purple robe: r ~ 130..170, g ~ 120..160, b ~ 150..200
        if (d[i] > 120 && d[i] < 170 && d[i+1] > 110 && d[i+1] < 160 && d[i+2] > 140 && d[i+2] < 200) {
          purpleCount++;
        }
        // white/light grey studio wall
        if (d[i] > 200 && d[i+1] > 215 && d[i+2] > 230) {
          whiteBgCount++;
        }
      }
      return { purpleCount, whiteBgCount, total: d.length / 4 };
    });

    if (isPurple.purpleCount > 2000 && isPurple.whiteBgCount > 10000) {
      console.log(`MATCH FOUND: ${f} -> purple: ${isPurple.purpleCount}, white: ${isPurple.whiteBgCount}`);
    }
  }
  await browser.close();
}

findPurpleKick();

