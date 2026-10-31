import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/traditional-flying-kick.jpg');
  
  const face = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Let's sample the region around y=100..200, x=350..550
    // Find skin and dark hair
    let hair = 0, skin = 0;
    for (let y = 80; y < 220; y++) {
      for (let x = 350; x < 600; x++) {
        const d = ctx.getImageData(x, y, 1, 1).data;
        const r = d[0], g = d[1], b = d[2];
        if (r < 70 && g < 70 && b < 70) hair++;
        if (r > 100 && g > 60 && b > 40 && r > g && r > b) skin++;
      }
    }
    return { w: canvas.width, h: canvas.height, hairPixels: hair, skinPixels: skin };
  });

  console.log('Face/head region in traditional-flying-kick:', face);
  await browser.close();
}

main();

