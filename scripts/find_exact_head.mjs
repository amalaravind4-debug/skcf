import { chromium } from 'playwright';

async function findExactHeadY() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/hero-flying-kick.jpg');
  
  const yStart = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    const img = document.querySelector('img');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Scan vertical line at x = 540 where head is located
    for (let y = 0; y < 400; y++) {
      const d = ctx.getImageData(540, y, 1, 1).data;
      // when color departs from studio background (205, 223, 239)
      if (Math.abs(d[0] - 205) + Math.abs(d[1] - 223) + Math.abs(d[2] - 239) > 25) {
        return { y, color: [d[0], d[1], d[2]] };
      }
    }
    return null;
  });

  console.log('Head top Y coordinate:', yStart);
  await browser.close();
}

findExactHeadY();

