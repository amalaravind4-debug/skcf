import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/traditional-flying-kick.jpg');

  const corners = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const get = (x, y) => Array.from(ctx.getImageData(x, y, 1, 1).data).slice(0, 3);
    return {
      topLeft: get(10, 10),
      topRight: get(img.naturalWidth - 10, 10),
      bottomLeft: get(10, img.naturalHeight - 10),
      bottomRight: get(img.naturalWidth - 10, img.naturalHeight - 10),
      bottomCenter: get(img.naturalWidth / 2, img.naturalHeight - 10),
      topCenter: get(img.naturalWidth / 2, 10),
    };
  });

  console.log('Corners of traditional-flying-kick.jpg:', corners);
  await browser.close();
}

main();

