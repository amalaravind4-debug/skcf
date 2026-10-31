import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // load user screenshot
  await page.goto('file:///C:/Users/Amal Aravind/.gemini/antigravity/brain/fa468976-b1c3-4c62-b1fa-2178140d2808/.user_uploaded/media_1793458887140_cee265b6.jpg');
  const userPixels = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = 60; canvas.height = 40;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, 60, 40);
    return Array.from(ctx.getImageData(0, 0, 60, 40).data);
  });

  const candidates = [
    'current_hero_flying_kick.png',
    'live_flying_img_2.png',
    'live_flying_img_5.png',
    'live_flying_img_12.png',
    'live_flying_img_21.png'
  ];

  for (const c of candidates) {
    await page.goto('file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/' + c);
    const score = await page.evaluate((target) => {
      const img = document.querySelector('img');
      const canvas = document.createElement('canvas');
      canvas.width = 60; canvas.height = 40;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, 60, 40);
      const cur = ctx.getImageData(0, 0, 60, 40).data;
      let diff = 0;
      for (let i = 0; i < cur.length; i += 4) {
        diff += Math.abs(cur[i] - target[i]) + Math.abs(cur[i+1] - target[i+1]) + Math.abs(cur[i+2] - target[i+2]);
      }
      return diff / (60 * 40);
    }, userPixels);
    console.log(`${c}: difference score = ${score.toFixed(2)}`);
  }

  await browser.close();
}

main();

