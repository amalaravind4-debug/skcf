import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/traditional-flying-kick.jpg');
  
  const res = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    let minHairY = canvas.height, maxHairY = 0, minHairX = canvas.width, maxHairX = 0;
    let minSkinY = canvas.height, maxSkinY = 0, minSkinX = canvas.width, maxSkinX = 0;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        const r = d[i], g = d[i+1], b = d[i+2];
        if (r < 60 && g < 60 && b < 60) {
          if (x < minHairX) minHairX = x;
          if (x > maxHairX) maxHairX = x;
          if (y < minHairY) minHairY = y;
          if (y > maxHairY) maxHairY = y;
        }
        if (r > 120 && g > 70 && b > 50 && r > g && r > b) {
          if (x < minSkinX) minSkinX = x;
          if (x > maxSkinX) maxSkinX = x;
          if (y < minSkinY) minSkinY = y;
          if (y > maxSkinY) maxSkinY = y;
        }
      }
    }
    return {
      w: canvas.width,
      h: canvas.height,
      hair: { minHairX, maxHairX, minHairY, maxHairY },
      skin: { minSkinX, maxSkinX, minSkinY, maxSkinY }
    };
  });

  console.log('Coordinates in traditional-flying-kick.jpg:', res);
  await browser.close();
}

main();

