import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/traditional-flying-kick.jpg');
  
  const bands = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const b = [];
    const step = Math.floor(canvas.height / 10);
    for (let i = 0; i < 10; i++) {
      const y = i * step + Math.floor(step / 2);
      // average 20 pixels across width at this y
      let rSum = 0, gSum = 0, bSum = 0;
      for (let x = 0; x < canvas.width; x += 40) {
        const d = ctx.getImageData(x, y, 1, 1).data;
        rSum += d[0]; gSum += d[1]; bSum += d[2];
      }
      const count = Math.ceil(canvas.width / 40);
      b.push({
        y,
        avg: [Math.round(rSum / count), Math.round(gSum / count), Math.round(bSum / count)]
      });
    }
    return { w: canvas.width, h: canvas.height, bands: b };
  });

  console.log('traditional-flying-kick 10 bands down:', JSON.stringify(bands, null, 2));
  await browser.close();
}

main();
