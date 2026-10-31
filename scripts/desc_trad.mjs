import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/traditional-flying-kick.jpg');
  
  const desc = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Let's sample colors:
    // What is at the top? (y = 50..150)
    // What is in the center? (y = 400..600)
    // What is at the bottom? (y = 800..1000)
    return {
      w: canvas.width,
      h: canvas.height,
      sampleTop: Array.from(ctx.getImageData(canvas.width / 2, 50, 1, 1).data).slice(0, 3),
      sampleFace: Array.from(ctx.getImageData(canvas.width / 2, 200, 1, 1).data).slice(0, 3),
      sampleCenter: Array.from(ctx.getImageData(canvas.width / 2, 500, 1, 1).data).slice(0, 3),
      sampleBottom: Array.from(ctx.getImageData(canvas.width / 2, 900, 1, 1).data).slice(0, 3),
    };
  });
  console.log('traditional-flying-kick colors:', desc);
  await browser.close();
}

main();

