import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/traditional-flying-kick.jpg');
  const details = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Let's sample a few points
    // top row
    const top = ctx.getImageData(canvas.width / 2, 5, 1, 1).data;
    // middle
    const mid = ctx.getImageData(canvas.width / 2, canvas.height / 2, 1, 1).data;
    return {
      w: canvas.width,
      h: canvas.height,
      top: [top[0], top[1], top[2]],
      mid: [mid[0], mid[1], mid[2]]
    };
  });
  console.log('traditional-flying-kick info:', details);
  await browser.close();
}

main();

