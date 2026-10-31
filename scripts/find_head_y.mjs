import { chromium } from 'playwright';

async function findHeadY() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/hero-flying-kick.jpg');
  
  const result = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    const img = document.querySelector('img');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    // Background color is roughly rgba(215..230, 225..240, 235..250)
    // Let's find rows with significant contrast (the person)
    let firstPersonY = -1;
    let lastPersonY = -1;

    for (let y = 0; y < canvas.height; y++) {
      let count = 0;
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        const r = d[i], g = d[i+1], b = d[i+2];
        // difference from light background
        if (Math.abs(r - 220) + Math.abs(g - 230) + Math.abs(b - 240) > 40) {
          count++;
        }
      }
      if (count > 20) {
        if (firstPersonY === -1) firstPersonY = y;
        lastPersonY = y;
      }
    }
    return { firstPersonY, lastPersonY, totalH: canvas.height };
  });

  console.log('Person vertical span:', result);
  await browser.close();
}

findHeadY();

