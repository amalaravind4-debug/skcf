import { chromium } from 'playwright';
import fs from 'fs';

async function matchScreenshot() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Load the user's screenshot
  await page.goto('file:///C:/Users/Amal Aravind/.gemini/antigravity/brain/fa468976-b1c3-4c62-b1fa-2178140d2808/.user_uploaded/media_1793458887140_cee265b6.jpg');
  const userImgData = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = 100; canvas.height = 100;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, 100, 100);
    return Array.from(ctx.getImageData(0, 0, 100, 100).data);
  });

  const files = fs.readdirSync('public/images').filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  const scores = [];

  for (const f of files) {
    await page.goto(`http://localhost:5173/images/${f}`);
    const sim = await page.evaluate((targetData) => {
      const img = document.querySelector('img');
      const canvas = document.createElement('canvas');
      canvas.width = 100; canvas.height = 100;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, 100, 100);
      const cur = ctx.getImageData(0, 0, 100, 100).data;
      let diff = 0;
      for (let i = 0; i < cur.length; i += 4) {
        diff += Math.abs(cur[i] - targetData[i]) + Math.abs(cur[i+1] - targetData[i+1]) + Math.abs(cur[i+2] - targetData[i+2]);
      }
      return diff / (100 * 100);
    }, userImgData);
    scores.push({ f, score: sim });
  }

  scores.sort((a, b) => a.score - b.score);
  console.log('Top 5 best matches to user upload:');
  console.log(scores.slice(0, 5));
  await browser.close();
}

matchScreenshot();

