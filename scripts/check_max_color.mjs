import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/before_vs_after_card10.png');

  const maxVal = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    let maxR = 0, maxG = 0, maxB = 0;
    const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i] > maxR) maxR = d[i];
      if (d[i+1] > maxG) maxG = d[i+1];
      if (d[i+2] > maxB) maxB = d[i+2];
    }
    return { maxR, maxG, maxB };
  });

  console.log('Max color values in before_vs_after_card10.png:', maxVal);
  await browser.close();
}

main();

