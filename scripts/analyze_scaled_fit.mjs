import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/google_orig_scaled_fit.png');
  // Let's get pixel values from google_orig_scaled_fit.png
  const data = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Look at rows from top to bottom
    const step = 20;
    const summary = [];
    for (let y = 0; y < canvas.height; y += step) {
      let nonBgCount = 0;
      for (let x = 0; x < canvas.width; x += 10) {
        const d = ctx.getImageData(x, y, 1, 1).data;
        // background is #222 (around 34, 34, 34) or white studio
        if (d[0] > 50 && (d[0] < 200 || d[1] < 200 || d[2] < 200)) {
          // person!
          nonBgCount++;
        }
      }
      if (nonBgCount > 0) {
        summary.push({ y, nonBgCount });
      }
    }
    return {
      w: canvas.width,
      h: canvas.height,
      firstPersonY: summary[0],
      lastPersonY: summary[summary.length - 1],
      summaryCount: summary.length
    };
  });
  console.log('Analysis of google_orig_scaled_fit:', data);
  await browser.close();
}

main();

