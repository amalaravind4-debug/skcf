import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/hero-flying-kick.jpg');
  
  const row0 = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const nonWhite = [];
    for (let x = 0; x < canvas.width; x++) {
      const d = ctx.getImageData(x, 0, 1, 1).data;
      // if not background (background is light grey/white, around 210..240)
      if (d[0] < 195 || d[1] < 195 || d[2] < 195) {
        nonWhite.push({ x, rgb: [d[0], d[1], d[2]] });
      }
    }
    return {
      totalNonWhiteAtRow0: nonWhite.length,
      firstX: nonWhite[0]?.x,
      lastX: nonWhite[nonWhite.length - 1]?.x,
      samples: nonWhite.filter((_, idx) => idx % 20 === 0)
    };
  });
  console.log('Row 0 non-white pixels:', row0);
  await browser.close();
}

main();

