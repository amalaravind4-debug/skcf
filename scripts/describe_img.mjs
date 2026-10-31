import { chromium } from 'playwright';

async function describeImg() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + '/screenshots/google_original_flying_kick.jpg');
  
  const analysis = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    const img = document.querySelector('img');
    canvas.width = 300;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Check colors across the 400 rows
    const dominantColors = [];
    for (let y = 0; y < 400; y += 40) {
      let rSum = 0, gSum = 0, bSum = 0;
      for (let x = 0; x < 300; x += 10) {
        const d = ctx.getImageData(x, y, 1, 1).data;
        rSum += d[0]; gSum += d[1]; bSum += d[2];
      }
      dominantColors.push({
        y,
        avg: [Math.round(rSum / 30), Math.round(gSum / 30), Math.round(bSum / 30)]
      });
    }
    return dominantColors;
  });

  console.log('Dominant colors down the image:', analysis);
  await browser.close();
}

describeImg();

