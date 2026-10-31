import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/before_vs_after_card10.png');

  const info = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Find cards by looking for white/grey pixels
    // Let's sample along horizontal line y = 200
    const row200 = [];
    for (let x = 0; x < canvas.width; x += 20) {
      const d = ctx.getImageData(x, 200, 1, 1).data;
      row200.push({ x, rgb: [d[0], d[1], d[2]] });
    }
    return { w: canvas.width, h: canvas.height, row200 };
  });

  console.log('Image dimensions and row 200:');
  console.log(info.w, info.h);
  console.log(info.row200.filter(p => p.rgb[0] > 50));
  await browser.close();
}

main();

