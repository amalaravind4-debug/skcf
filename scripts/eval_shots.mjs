import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const shot of ['shot_option_b.png', 'shot_option_c.png', 'shot_option_d.png']) {
    await page.goto('file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/' + shot);
    const res = await page.evaluate(() => {
      const img = document.querySelector('img');
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      // Card bounding box: find border/content inside
      // Inside card (around y=30..270, x=10..360)
      let headHairPixels = 0;
      let topMarginToPerson = -1;

      for (let y = 30; y < canvas.height - 20; y++) {
        for (let x = 20; x < canvas.width - 20; x++) {
          const i = (y * canvas.width + x) * 4;
          const r = d[i], g = d[i+1], b = d[i+2];
          // hair: dark
          if (r < 70 && g < 70 && b < 70) {
            headHairPixels++;
            if (topMarginToPerson === -1) topMarginToPerson = y;
          }
        }
      }
      return { headHairPixels, topMarginToPerson, w: canvas.width, h: canvas.height };
    });
    console.log(shot, res);
  }
  await browser.close();
}

main();

